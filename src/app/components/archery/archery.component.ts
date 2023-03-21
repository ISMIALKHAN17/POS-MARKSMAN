import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-archery',
  templateUrl: './archery.component.html',
  styleUrls: ['./archery.component.css']
})
export class ArcheryComponent {
  bookingForm: any;
  resData:any
  totalPrice:any= 0
  discountedTotalPrice:any = 0
  discountedPrice:any = 0
  subTotal:any
  packages: any = [ {name:'Air Pistol',price:499} , {name:'Air Rifle Basic' , price:599}, {name:'Air Rifle Assault 177' , price:599},{name:'Air Rifle Precision 22' , price:999},{name:'Air Rifle Assault Premium' ,price:999}];

  constructor(private formBuilder: FormBuilder, private apiService: RequestService , public modalService:NgbModal) { }

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      package: ['', Validators.required],
      price: ['', Validators.required],
      discount: [''],
      subTotal: [''],
      user_id:['']
    });
  }
  onSubmit(confirm:any , success:any) {
    console.log(this.bookingForm.value)
    const user = localStorage.getItem('user')
    const userjson = JSON.parse(user!)
    this.bookingForm.patchValue({
      price:this.discountedTotalPrice,
      package:this.bookingForm.get('package').value.name,
      discount:this.discountedPrice,
      subTotal:this.subTotal,
      user_id:userjson.id
    })
    .console
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
          <span >Name:</span>
          <span>${this.resData.name}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
      <span >Phone Number:</span>
      <span>${this.resData.number}</span>
       </div>
       <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
       <span >Email:</span>
       <span>${this.resData.email}</span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Package:</span>
        <span>${this.resData.package}</span>
         </div>
        <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
          <span>Package</span>
          <span>${this.subTotal}</span>
       </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
          <span>Discount:</span>
          <span>${this.discountedPrice}</span>
       </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
          <span>Total:</span>
          <span><b>${this.discountedTotalPrice}</b></span>
       </div>
        </div>
      `;
      myWindow!.document.write(dynamicContent);
      // Print the new window
  }
  onPackageSelect() {
    const selectedPackage = this.bookingForm.get('package').value;
    this.totalPrice = selectedPackage.price
    this.subTotal = this.totalPrice
    this.discountedTotalPrice = this.totalPrice
  }
  
  calculateDiscount() {
    this.discountedTotalPrice = Math.round(this.totalPrice - (this.totalPrice * (this.bookingForm.value.discount / 100)));
    this.discountedPrice = this.totalPrice - this.discountedTotalPrice 
    console.log(this.discountedPrice)
  }
}
