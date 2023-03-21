import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-archery-final',
  templateUrl: './archery-final.component.html',
  styleUrls: ['./archery-final.component.css']
})
export class ArcheryFinalComponent {
  bookingForm: any;
  resData:any
  totalPrice:any= 0
  discountedTotalPrice:any = 599
  discountedPrice:any = 0
  subTotal:any = 599
  packages: any = [ {name:'Basic',price:599}];
  value = 0;

  constructor(private formBuilder: FormBuilder, private apiService: RequestService , public modalService:NgbModal) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      package: ['', Validators.required],
      price: ['', Validators.required],
      discount: [''],
      subTotal: [''],
      rounds: [''],
      user_id:['']
    });
  }

  onSubmit(confirm:any , success:any) {
    console.log(this.bookingForm.value)
    const user =  localStorage.getItem('user')
    const userJson = JSON.parse(user!)
    this.bookingForm.patchValue({
      price:this.discountedTotalPrice,
      package:this.bookingForm.get('package').value.name,
      discount:this.discountedPrice,
      subTotal:this.subTotal,
      user_id:userJson.id
    })
    if (this.bookingForm.valid) {
      this.modalService.open(confirm,{centered:true}).result.then((result:any)=>{
        if(result== 'yes'){
          this.apiService.post('api/archery/booking',this.bookingForm.value,true).subscribe(
            (response:any) => {
              this.resData = response 
              this.modalService.open(success,{centered:true}).result.then((res:any)=>{
                this.bookingForm.reset()
              })
              this.print()
            },
            (error:any) => console.log(error)
          );
        }else{
          this.modalService.dismissAll()
        }
      })
   
      console.log(this.bookingForm.value)
    }
  }

  get name() {
    return this.bookingForm.get('name');
  }

  get number() {
    return this.bookingForm.get('number');
  }

  get email() {
    return this.bookingForm.get('email');
  }

  get phone() {
    return this.bookingForm.get('phone');
  }

  get package() {
    return this.bookingForm.get('package');
  }

  print(){
      // Open a new window
      var myWindow = window.open('', 'myWindow', 'width=800,height=720');
      // Write some dynamic HTML content to the new window
      var dynamicContent = `
      <div id="contentToPrint" style"font-size;11px; font-family: sans-serif;">
      
        <div style="margin-bottom:15px ; text-align:center;">
        <img  width="200px" src="../../../assets/img/logo.png" alt="">
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
          <span >Booking ID:</span>
          <span>${this.resData.id}</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Game:</span>
        <span>Archery</span>
      </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
          <span >Name:</span>
          <span>${this.resData.name}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
      <span >Phone Number:</span>
      <span>${this.resData.number}</span>
       </div>
    
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Package:</span>
        <span>${this.resData.package}</span>
         </div>
        <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
          <span>Package</span>
          <span>Rs ${this.subTotal}</span>
       </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
          <span>Discount:</span>
          <span>Rs ${this.discountedPrice}</span>
       </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
          <span>Total:</span>
          <span><b>Rs ${this.discountedTotalPrice}</b></span>
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
  onPackageSelect() {
    const selectedPackage = this.bookingForm.get('package').value;
    this.totalPrice = selectedPackage.price
    this.subTotal = this.totalPrice
    this.discountedTotalPrice = this.totalPrice
  }
  
  calculateDiscount() {
    if (this.bookingForm.value.discount > 100 || this.bookingForm.value.discount < 0) {
      this.bookingForm.controls['discount'].setValue(100);
    }
    this.discountedTotalPrice = Math.round(this.totalPrice - (this.totalPrice * (this.bookingForm.value.discount / 100)));
    this.discountedPrice = this.totalPrice - this.discountedTotalPrice 
    console.log(this.discountedPrice)
  }
 

  increment() {
    this.bookingForm.get('value').setValue(this.bookingForm.get('value').value + 1);
  }

  decrement() {
    this.bookingForm.get('value').setValue(this.bookingForm.get('value').value - 1);
  }
  
}
