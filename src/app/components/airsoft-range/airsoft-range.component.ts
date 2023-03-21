import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-airsoft-range',
  templateUrl: './airsoft-range.component.html',
  styleUrls: ['./airsoft-range.component.css'],
  providers:[DecimalPipe]
})
export class AirsoftRangeComponent {
  bookingForm: any;
  resData: any;
  totalPrice: any = 499;
  discountedTotalPrice: any = 499;
  discountedPrice: any = 0;
  subTotal: any = 499;
  noData: any = false;
  searches: any;
  searchResult: any = false;
  responseData: any;
  selectedPackagePrice: any = 499;
  isLoading: any = false;
  updateAddon: any;
  resRounds: any;
  resSheet: any = 0;
  searchSheets: any;
  searchRounds: any;
  error: any = false;
  resSubTotal: any;
  addonsCharges: any = 0;
  roundsCount: any = 0;
  sheetCount: any = 0;
  numberOfShootersPrice:any = 499
  resPrice: any;
  packages: any = [
    { name: 'Air Pistol', price: 499 },
    { name: 'Air Rifle Basic', price: 599 },
    { name: 'Air Rifle Assault 177', price: 599 },
    { name: 'Air Rifle Precision 22', price: 999 },
    { name: 'Air Rifle Assault Premium', price: 999 },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private apiService: RequestService,
    public modalService: NgbModal,
    public decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.bookingForm = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      package: [
        this.packages.find((p: any) => p.name == 'Air Pistol'),
        Validators.required,
      ],
      price: ['', Validators.required],
      discount: [''],
      rounds: ['0'],
      sheet: ['0'],
      subTotal: [''],
      user_id: [''],
      numberOfShooters:['1']
    });
  }
  onSubmit(confirm: any, success: any) {
    console.log(this.bookingForm.value);
    const user = localStorage.getItem('user');
    const userjson = JSON.parse(user!);
    this.bookingForm.patchValue({
      price: this.discountedTotalPrice,
      package: this.bookingForm.get('package').value.name,
      discount: this.discountedPrice,
      subTotal: this.subTotal,
      user_id: userjson.id,
    });
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
      this.modalService
        .open(confirm, { centered: true })
        .result.then((result: any) => {
          if (result == 'yes') {
            this.apiService
              .post('api/airsoft/booking', this.bookingForm.value, true)
              .subscribe(
                (response: any) => {
                  this.resData = response;
                  this.modalService
                    .open(success, { centered: true })
                    .result.then((res: any) => {
                      this.bookingForm.reset();
                    });
                  this.print();
                },
                (error: any) => console.log(error)
              );
          } else {
            this.modalService.dismissAll();
            this.bookingForm.reset();
          }
        });

      console.log(this.bookingForm.value);
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

  print() {
    var myWindow = window.open('', 'myWindow', 'width=800,height=720');
    // const rounds = (this.resData.rounds * 250);
    // const sheets = (this.resData.sheet * 50);
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
          <span >Booking Date:</span>
          <span>${this.resData.date}</span>
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
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Package Price:</span>
        <span>${this.selectedPackagePrice}</span>
         </div>
         <span >Add-ons</span>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Rounds:</span>
        <span>${this.resData.rounds}</span>
         </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Sheet:</span>
        <span>${this.resData.sheet}</span>
         </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
        <span >Number Of Shooters:</span>
        <span>${this.resData.numberOfShooters}</span>
         </div>
        <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
          <span>Sub Total</span>
          <span>Rs ${this.decimalPipe.transform(this.numberOfShootersPrice,'1.0-0')}</span>
       </div>
       <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
       <span>Add on charges</span>
       <span>Rs ${this.decimalPipe.transform(this.addonsCharges,'1.0-0')}</span>
    </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
          <span>Discount:</span>
          <span>Rs ${this.decimalPipe.transform(this.discountedPrice,'1.0-0')}</span>
       </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
          <span>Total:</span>
          <span><b >Rs ${this.decimalPipe.transform(this.discountedTotalPrice,'1.0-0')}</b></span>
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
      // myWindow?.close();
    }, 1000);
  }
  onPackageSelect() {
    const selectedPackage = this.bookingForm.get('package').value;
    this.totalPrice = selectedPackage.price;
    this.selectedPackagePrice = selectedPackage.price;
    this.subTotal = this.totalPrice;
    this.discountedTotalPrice = this.totalPrice;
    console.log(this.selectedPackagePrice);
    this.calculateDiscount();
    this.bookingForm.controls['rounds'].setValue(0);
    this.bookingForm.controls['sheet'].setValue(0);
    this.bookingForm.controls['numberOfShooters'].setValue(1)
    this.numberOfShootersPrice = selectedPackage.price
    this.addonsCharges = 0;
  }
  calculateDiscount() {
    if (
      this.bookingForm.value.discount > 100 ||
      this.bookingForm.value.discount < 0
    ) {
      this.bookingForm.controls['discount'].setValue(100);
    }
    this.discountedTotalPrice = Math.round(
      this.subTotal - this.subTotal * (this.bookingForm.value.discount / 100)
    );
    this.discountedPrice = this.subTotal - this.discountedTotalPrice;
  }
  increment() {
    const val = parseInt(this.bookingForm.value.rounds);
    if (val >= 100) {
      this.bookingForm.controls['rounds'].setValue(100);
    } else {
      this.bookingForm.controls['rounds'].setValue(val + 1);
      this.subTotal =
        this.bookingForm.get('package').value.price == 999
          ? this.subTotal + 500
          : this.subTotal + 250;
      this.addonsCharges =
        this.bookingForm.get('package').value.price == 999
          ? this.addonsCharges + 500
          : this.addonsCharges + 250;
      this.discountedTotalPrice = this.subTotal;
      this.calculateDiscount();
    }
  }
  decrement() {
    const val = parseInt(this.bookingForm.value.rounds);
    if (val <= 0) {
      this.bookingForm.controls['rounds'].setValue(0);
    } else {
      this.bookingForm.controls['rounds'].setValue(val - 1);
      this.subTotal =
        this.bookingForm.get('package').value.price == 999
          ? this.subTotal - 500
          : this.subTotal - 250;
      this.addonsCharges =
        this.bookingForm.get('package').value.price == 999
          ? this.addonsCharges - 500
          : this.addonsCharges - 250;
      this.discountedTotalPrice = this.subTotal;
    }
    this.calculateDiscount();
  }
  incrementSheet() {
    const val = parseInt(this.bookingForm.value.sheet);
    this.bookingForm.controls['sheet'].setValue(val + 1);
    this.subTotal = this.subTotal + 50;
    this.addonsCharges = this.addonsCharges + 50;
    this.discountedTotalPrice = this.subTotal;
    this.calculateDiscount();
  }
  decrementSheet() {
    const val = parseInt(this.bookingForm.value.sheet);
    if (val <= 0) {
      this.bookingForm.controls['sheet'].setValue(0);
    } else {
      this.bookingForm.controls['sheet'].setValue(val - 1);
      this.subTotal = this.subTotal - 50;
      this.addonsCharges = this.addonsCharges - 50;
      this.discountedTotalPrice = this.subTotal;
    }
    this.calculateDiscount();
  }

  // search

  increment2() {
    const val = parseInt(this.updateAddon.value.rounds);
    if (val >= 100) {
      this.updateAddon.controls['rounds'].setValue(100);
    } else {
      this.updateAddon.controls['rounds'].setValue(val + 1);
      this.resSubTotal =
        this.responseData.package == 'Air Rifle Assault Premium' ||
        this.responseData.package == 'Air Rifle Precision 22'
          ? parseInt(this.resSubTotal) + 500
          : parseInt(this.resSubTotal) + 250;
      this.resPrice = this.resSubTotal;
      this.addonsCharges =
        this.responseData.package == 'Air Rifle Assault Premium' ||
        this.responseData.package == 'Air Rifle Precision 22'
          ? this.addonsCharges + 500
          : this.addonsCharges + 250;
      this.roundsCount = this.roundsCount + 1;
    }
  }
  decrement2() {
    const val = parseInt(this.updateAddon.value.rounds);
    if (val <= this.searchRounds) {
      this.updateAddon.controls['rounds'].setValue(this.searchRounds);
      console.log(this.updateAddon.value.rounds);
    } else {
      this.updateAddon.controls['rounds'].setValue(val - 1);
      this.resSubTotal =
        this.responseData.package == 'Air Rifle Assault Premium' ||
        this.responseData.package == 'Air Rifle Precision 22'
          ? parseInt(this.resSubTotal) - 500
          : parseInt(this.resSubTotal) - 250;
      this.addonsCharges =
        this.responseData.package == 'Air Rifle Assault Premium' ||
        this.responseData.package == 'Air Rifle Precision 22'
          ? this.addonsCharges - 500
          : this.addonsCharges - 250;
      this.resPrice = this.resSubTotal;
      this.roundsCount = this.roundsCount - 1;
    }
  }

  incrementSheet2() {
    const val = parseInt(this.updateAddon.value.sheet);
    this.updateAddon.controls['sheet'].setValue(val + 1);
    this.resSubTotal = this.resSubTotal + 50;
    this.addonsCharges = this.addonsCharges + 50;
    this.resPrice = this.resSubTotal;
    this.resSheet = parseInt(this.resSheet) + 1;
  }
  decrementSheet2() {
    console.log(0);
    const val = parseInt(this.updateAddon.value.sheet);
    if (val <= this.searchSheets) {
      this.updateAddon.controls['sheet'].setValue(this.searchSheets);
      console.log(1);
    } else {
      this.updateAddon.controls['sheet'].setValue(val - 1);
      this.resSubTotal = this.resSubTotal - 50;
      this.addonsCharges = this.addonsCharges - 50;
      this.resPrice = this.resSubTotal;
      this.resSheet = parseInt(this.resSheet) - 1;
    }
  }
  numberOfShootersAdd(){
    const val = parseInt(this.bookingForm .value.numberOfShooters);
    this.bookingForm.controls['numberOfShooters'].setValue(val + 1);
    this.subTotal = this.subTotal +  this.bookingForm.get('package').value.price 
    this.numberOfShootersPrice = this.numberOfShootersPrice + this.bookingForm.get('package').value.price
    this.calculateDiscount()
   
  }
  numberOfShootersRemove(){
    const val = parseInt(this.bookingForm .value.numberOfShooters);
      if (val <= 1) {
      this.bookingForm.controls['numberOfShooters'].setValue(1);
    }else{
      this.bookingForm.controls['numberOfShooters'].setValue(val - 1);
      this.subTotal = this.subTotal -  this.bookingForm.get('package').value.price 
      this.numberOfShootersPrice = this.numberOfShootersPrice - this.bookingForm.get('package').value.price
      this.calculateDiscount()
    }
   
  }
  open(addons: any) {
    this.modalService.open(addons, { centered: true });
  }
  search() {
    this.isLoading = true;
    this.apiService
      .post(
        'api/airsoft/find',
        {
          id: this.searches,
        },
        true
      )
      .subscribe((res: any) => {
        this.responseData = res;
        if (this.responseData != 0) {
          this.searchResult = true;
          this.resRounds = this.responseData.rounds ?? 0;
          this.searchSheets = this.responseData.sheet ?? 0;
          this.searchRounds = this.responseData.rounds ?? 0;
          this.resPrice = this.responseData.price;
          this.resSubTotal = this.responseData.subTotal;
          this.resSubTotal = parseInt(this.resSubTotal);
          this.updateAddon = this.formBuilder.group({
            id: [''],
            price: [''],
            subTotal: [''],
            rounds: [this.searchRounds],
            sheet: [this.searchSheets],
          });
        } else {
          this.noData = true;
          setTimeout(() => {
            this.noData = false;
          }, 2000);
          this.searchResult = false;
        }
        this.isLoading = false;
      });
  }
  updateaddon(confirm: any, success: any, error: any) {
    this.updateAddon.patchValue({
      id: this.responseData.id,
      price: this.resPrice,
      subTotal: this.resSubTotal,
    });
    this.modalService
      .open(confirm, { centered: true })
      .result.then((res: any) => {
        if (res == 'yes' && this.addonsCharges != 0) {
          this.apiService
            .post('api/airsoft/update', this.updateAddon.value, true)
            .subscribe((res: any) => {
              this.resData = res;
              this.modalService.open(success, { centered: true });
              this.addonPrint();
              this.addonsCharges = 0;
            });
        } else {
          this.modalService.open(error, { centered: true });
        }
      });
  }
  addonPrint() {
    var myWindow = window.open('', 'myWindow', 'width=800,height=720');
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
      <span >Booking Date:</span>
      <span>${this.resData.date}</span>
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
      <h5 >Add-ons</h5>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
      <span >Rounds:</span>
      <span>${this.roundsCount}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
      <span >Sheet:</span>
      <span>${this.resSheet}</span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
      <span >Number Of Shooters:</span>
      <span>${this.resData.numberOfShooters}</span>
      </div>
      <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
      <span>Add on charges</span>
      <span>Rs ${this.addonsCharges ?? 0}</span>
      </div>  
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
      <span>Total</span>
      <span><b >Rs ${this.addonsCharges ?? 0}</b></span>
     </div>
     <div class="footer" style="text-align:  center;margin-top: 20px;">
     <p style="margin: 0px">Thank You for Booking</p>
     <p style="margin: 0px">Powered by Technologenesis</p>
     </div>
     </div>
     `;
    myWindow!.document.write(dynamicContent);
    setTimeout(() => {
      myWindow!.window.print();
    }, 1000);
  }
  // search
}
