import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { RequestService } from 'src/app/Services/request.service';
@Component({
  selector: 'app-gel-blaster',
  templateUrl: './gel-blaster.component.html',
  styleUrls: ['./gel-blaster.component.css'],
  providers:[DecimalPipe]
})
export class GelBlasterComponent {
  responseData:any
  searches:any
  form:any
  totalAmount:any = 0
  subTotal:any = 0
  discount:any = 0

  constructor(private fb: FormBuilder, public deimalPipe:DecimalPipe ,public request:RequestService, public modal:NgbModal) {}
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone_no: new FormControl('', [Validators.required, Validators.pattern(/^03\d{9}$/)]),
      number_of_player: new FormControl('', Validators.required),
      discount: new FormControl(''),
      subTotal: new FormControl(''),
      price: new FormControl(''),
      user_id:new FormControl('')
    });
  }

  submitForm(confirm:any , success:any) {
    const user = localStorage.getItem('user')
    const userJson = JSON.parse(user!)
   this.form.patchValue({
    subTotal:this.subTotal,
    price:this.totalAmount,
    discount:this.discount,
    user_id:userJson.id
   })
   this.modal.open(confirm ,{centered:true}).result.then((res:any)=>{
     if(res == 'yes'){
       this.request.post('api/gelbaster/slot/booked',this.form.value,true).subscribe((res:any)=>{
         this.responseData =  res.data
         if(res.status == 'success')
         this.print()
      this.modal.open(success,{centered:true})
   })
  }
})

  }


   discountValidator() {
   if(this.form.controls['discount'].value> 100  ){
    this.form.controls['discount'].setValue(100);
   }
   this.subTotal = 199 * this.form.get('number_of_player').value;
   this.discount = this.form.get('discount').value || 0;
   this.totalAmount = Math.round(this.subTotal * (100 - this.discount) / 100);
  }










  print() {
    // Open a new window
    var myWindow = window.open('', 'myWindow', 'width=800,height=720');
    // Write some dynamic HTML content to the new window
    const dateWithDashes = this.responseData.select_date.replace(/\//g, "-");

    var dynamicContent = `
    <div id="contentToPrint" style"font-size;11px; font-family: sans-serif;">
    
      <div style="margin-bottom:15px ; text-align:center;">
      <img  width="200px" src="../../../assets/img/logo.png" alt="">
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Booking ID:</span>
        <span>${this.responseData.id}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Game:</span>
        <span>${this.responseData.game_name}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span>Date:</span>
        <span>${dateWithDashes}</span>
      </div>

    
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span>Name:</span>
        <span>${this.responseData.name}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span>Number:</span>
        <span>${this.responseData.phone_no}</span>
     </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span>Player:</span>
        <span>${this.responseData.number_of_player}</span>
     </div>
      <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
        <span>Sub Toltal:</span>
        <span>Rs ${this.responseData.subTotal}</span>
     </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span>Discount:</span>
        <span>Rs ${this.responseData.discount}</span>
     </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
        <span>Total:</span>
        <span><b>Rs ${this.responseData.price}</b></span>
     </div>

     <div class="footer" style="text-align:  center;margin-top: 20px;">
     <p style="margin: 0px">Thank You for Booking</p>
     <p style="margin: 0px">Powered by Technologenesis</p>
   </div>
      </div>
    `;
    myWindow!.document.write(dynamicContent);
    // Print the new window
    setTimeout(() => {
      myWindow!.window.print();
      myWindow?.close();
    }, 1000);
  
    }

    search(){}

    // calculateDiscount() {
    //   const storageData = localStorage.getItem('gell_blaster_final');
    //    const jsonUser = JSON.parse(storageData!);
    //   this.discountedTotalPrice = Math.round(jsonUser.price - (jsonUser.price * (this.bookingForm.value.discount / 100)));
    //   this.discountedPrice = jsonUser.price - this.discountedTotalPrice 
    //   console.log(this.discountedPrice)
    // }
}
