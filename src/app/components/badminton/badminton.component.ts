import { Component, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../Services/request.service';
import * as moment from 'moment';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {DecimalPipe} from '@angular/common'
import printJS from 'print-js';

@Component({
  selector: 'app-badminton',
  templateUrl: './badminton.component.html',
  styleUrls: ['./badminton.component.css'],
  providers:[DecimalPipe]
})
export class BadmintonComponent {

  @ViewChild('contentToPrint') contentToPrint!: ElementRef;
  minDate: any;
  closeResult = '';
  formControlValue = '';
  errorMessage: string = '';
  value = 0;
  step: any = 0;
  selectedDate: any;
  selected_date: any;
  bookedTimes: any;
  selectedTime: any;
  formGroup: any = [];
  fb: any;
  submitted: any;
  nameInput: any;
  emailInput: any;
  searchIsLoading: any = false;
  mainLoading = false;
  phoneInput: any;
  playerInput: any;
  selectedFromTime: any;
  selectedToTime: any;
  totalSelectedPlayers: any;
  totalPlayerArray: any = [];
  finalData: any;
  formData: any = [];
  ticket_price = 2000;
  confrimBooking = false;
  confirmBookingForm: any;
  displayErrors: any;
  discountedPrice: any = 0;
  subTotal:any
  numbersArry: any = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];
  numberMatched: any;
  // bookingStatus = false
  returnBookingData: any;
  gelBlasterSlots: any = [];
  selectedValues: any = [];
  isCheckedSlot: any;
  checkedSS: any;
  bookedSlots: any;
  selectedHour: any;
  isLoading: any = false;
  ifTimeSelected: any = false;
  check24Hours: any;
  returnBookingDataApi: any;
  diffHours: any;
  no_of_players: any;
  config: any;
  remaining_time: any;
  loginStatus: any;
  bookingForm: any;
  searchBookingForm: any = FormGroup;
  isCheck: any;
  checkc: any;
  discount: number = 0;
  discountedTotalPrice = 0;
  printsss:any = false
  paymentStatus = [
    { value: '', label: 'Paymetn Staus ' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' },
  ];
  bookingStatus = [
    { value: '', label: 'Booking Status' },
    { value: 'Booked', label: 'Booked' },
    { value: 'Cancel', label: 'Cancel' },
  ];
  paymentStatus2 = [
    { value: '', label: 'Paymetn Staus ' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' },
  ];
  bookingStatus2 = [
    { value: '', label: 'Booking Status' },
    { value: 'Booked', label: 'Booked' },
    { value: 'Cancel', label: 'Cancel' },
  ];
  constructor(
    private Api: RequestService,
    private modalService: NgbModal,
    private fba: FormBuilder,
    public DecimalPipe:DecimalPipe
  ) {
    this.bookingForm = this.fba.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('03[0-9]{9}')]],
      discount: [
        '0',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.max(100),
        ],
      ],
      payment_status: ['Booked'],
      bookingsStatus: ['Paid'],
    });
    this.searchBookingForm = this.fba.group({
      id: [''],
      user_id: [''],
      payment_status: ['Paid'],
      book_status: ['Booked'],
      discount: ['', [Validators.required]],
      subTotal: ['', [Validators.required]],
      price:['',[Validators.required]]
    });
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
  }

  // time_slot = false;
  new_div = true;
  booking = false;
  @ViewChild('printSection') printSection: ElementRef | undefined;
  printArea!: ElementRef;
  inputNumber = 'singles';
  itemDeleted = false;
  errr = false;
  datee: any;
  slot_number: any;
  submittedd = false;
  member_error = false;
  member_error2 = false;
  isThirdSelectDisabled = false;
  isThirdSelectDisabled1 = false;
  dltt = true;
  from: any;
  to: any;
  restt = false;
  isInvalid = false;
  numberr: any;
  emaill: any;
  namee: any;
  modal_div = true;
  searches: any;
  count2: any;
  cricket_update: any = FormGroup;
  booking_data: any = FormGroup;
  search_item: any = [];
  responseData: any;
  player_response: any;
  user_detail: any;
  user_detail2: any;
  divs = false;
  players: any = [];
  players2: any = [];
  count: any;
  amount: any;
  ex_val: any;
  ex_val2: any;
  div = false;
  new_div2 = true;
  nextPage = false;
  error_msg = false;
  isloading = false;
  isEditing = false;
  submited = false;
  isDateSelected = false;
  preloaderr = false;
  time_btn: any = [];
  pu: any;
  dataService: any;
  toggle = false;
  slot_id: any;
  slot_name: any;
  hours = [
    'Select hours',
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ];
  hours1 = [
    'Select hours',
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ];
  minute = ['Select Minute', '00', '15', '30', '45'];
  minute1 = ['Select Minute', '00', '15', '30', '45'];
  selectedOption1: any = this.hours[0];
  selectedOption2: any = this.minute[0];
  selectedOption3: any;
  selectedOption4: any = this.hours1[0];
  selectedOption5: any = this.minute1[0];
  selectedOption6: any;
  arrySlotIndex: any = [];
  ms = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  isChecked: boolean = false;
  addedPlayersArr: any = [];
  selectedTimeId: any;
  name: any;
  number: any;
  arr: any = [];
  numberOfPlayers: any;
  slotIndex: any;
  editIcon = false;
  loadingSlots = true;
  addedPlayers: any;
  totalPlayers: any;
  slotName: any;
  showLimitError = false;
  matchNumberArray: any = [];
  exclusive: any;
  exclusiveCheck: any;
  getexclusive: any;
  timeSlots = [];
  SlotsIndex = [];
  checkBoxChecked: any;
  userData: any;
  jsonUserData: any;
  showSpan = false;
  selected: any;
  booked = false;
  checkboxValue: any = [];
  arryData: any = [];
  arrynumbers: any = [];
  searchError: any = false;

  selected_slots: { slotes_id: any; name: any }[] = [];

  ngOnInit() {}

  search() {
    this.divs = false;
    this.new_div = false;
    this.new_div2 = false;
    this.div = true;
    this.searchIsLoading = true;
    this.Api.post(
      'api/badminton/slot/search',
      { data: this.searches },
      true
    ).subscribe((response: any) => {
      this.responseData = response;
      this.searchBookingForm.reset();
      this.checkc = false;
      if (this.responseData.length == 0) {
        this.searchIsLoading = false;
        this.searchError = true;
        setTimeout(() => {
          this.step = 0;
          this.new_div = true;
          this.div = false;
        }, 2000);
      } else {
        this.searchError = false;
        this.responseData = this.responseData[0];
          this.discountedTotalPrice = this.responseData.price
          this.subTotal = this.responseData.subTotal
          this.discountedPrice = this.responseData.discount
        this.searchIsLoading = false;
      }
    });
  }
  onDateSelect(event: any) {
    this.step = 1;
    this.mainLoading = true;
    this.isDateSelected = true;
    this.selected_date =
      this.selectedDate['month'] +
      '/' +
      this.selectedDate['day'] +
      '/' +
      this.selectedDate['year'];
    this.Api.post(
      'api/badminton/slot/timing',
      { select_date: this.selected_date },
      true
    ).subscribe((res) => {
      this.gelBlasterSlots = res;
      this.mainLoading = false;
      this.selectedValues = [];
      this.isCheckedSlot = [];
      this.checkedSS = false;
      this.selected_slots = [];
    });
    this.booking = true;
    // this.time_slot = true;
  }
  onBack() {
    this.nextPage = false;
    // this.time_slot = true;
  }
  onBack1() {
    // this.time_slot = false;
    this.isDateSelected = false;
  }
  onFront() {
    // this.time_slot = false;
    this.nextPage = true;
  }
  boxes() {
    this.nextPage = false;
    // this.time_slot = true;
  }
  boxes1() {
    this.div = false;
    this.new_div = true;
  }
  onCheckboxChange(gelSlots: any) {
    if (gelSlots.checked) {
      // Add to selected_slots array
      this.selected_slots.push({ slotes_id: gelSlots.id, name: gelSlots.name });
    } else {
      // Remove from selected_slots array
      const index = this.selected_slots.findIndex(
        (slot) => slot.slotes_id === gelSlots.id
      );
      if (index !== -1) {
        this.selected_slots.splice(index, 1);
      }
    }
  }
  backBtn() {
    this.checkedSS = false;
    this.selectedValues = [];
  }
  submitData() {
    if (this.selected_slots.length != 0) {
      // Hours Diffrance
      let startTimeString2 = `${this.check24Hours}${this.selectedHour}:00 PM`;
      let selectedTime = moment(startTimeString2, 'YYYY-MM-DD hh:mm a');
      let now = moment();
      let difference2 = selectedTime.diff(now, 'hours', true);
      let roundedDifference = Math.round(difference2);
      // Hours Diffrance
      this.diffHours = roundedDifference;
      this.ifTimeSelected = true;
      this.step = 2;
      let getData: any = localStorage.getItem('cricket_booking_form');
      const jsonUserData = JSON.parse(getData);
      this.totalSelectedPlayers = this.inputNumber;
      const data = {
        no_of_players: this.inputNumber,
        date: this.selected_date,
        slots: this.selected_slots,
        booked_for: this.selected_slots.length,
        price:
          this.inputNumber == 'singles'
            ? 599 * this.selected_slots.length
            : 799 * this.selected_slots.length,
        remaining_hours: this.remaining_time,
      };
      localStorage.setItem('gell_blaster_final', JSON.stringify(data));
      this.step = 2;
      const storageData = localStorage.getItem('gell_blaster_final');
      this.finalData = JSON.parse(storageData!);
      this.discountedTotalPrice = this.finalData.price;
      this.subTotal = data.price
    } else {
      this.ifTimeSelected = false;
    }
  }
  saveData(confirm: any, success: any) {
    this.isCheck = true;
    if (this.bookingForm.valid) {
      const storageData = localStorage.getItem('gell_blaster_final');
      const jsonData = JSON.parse(storageData!);
      const user = localStorage.getItem('user');
      const userJson = JSON.parse(user!);
      this.finalData = {
        name: this.bookingForm.value.name,
        phone_no: this.bookingForm.value.number,
        email: this.bookingForm.value.email,
        number_of_player: jsonData.no_of_players,
        select_date: jsonData.date,
        price: this.discountedTotalPrice,
        booked_slots: jsonData.slots,
        selected_slot: jsonData.selected_slot,
        book_status: 'Booked',
        payment_status: 'Paid',
        user_id: userJson.id,
        subTotal: jsonData.price,
        discount: this.discountedPrice,
        type: 'Employee',
      };
      // console.log(this.finalData);
      this.modalService
        .open(confirm, { backdrop: 'static', centered: true })
        .result.then((result) => {
          if (result == 'yes') {
            this.Api.post(
              'api/badminton/slot/booking',
              this.finalData,
              true
            ).subscribe((response: any) => {
              this.responseData = response.data[0];
              if (response.status == 'success') {
                this.modalService.open(success, {
                  backdrop: 'static',
                  centered: true,
                });
                this.print()
              }
            });
          }
        });
    }
  }
  searchBooking(confirm: any, success: any) {
    this.isCheck = true;
    this.checkc = true;
    const user = localStorage.getItem('user');
    const userJson = JSON.parse(user!);
    this.searchBookingForm.patchValue({
      id: this.responseData.id,
      user_id: userJson.id,
    });
    this.searchBookingForm.patchValue({
      discount: this.discountedPrice,
      subTotal: this.subTotal,
      price: this.discountedTotalPrice,
    });
    if (this.searchBookingForm.valid) {

      this.modalService
        .open(confirm, { backdrop: 'static', centered: true })
        .result.then((result) => {
          if (result == 'yes') {
            this.searchIsLoading = true;
            this.Api.post(
              'api/badminton/slot/update',
              this.searchBookingForm.value,
              true
            ).subscribe((res) => {
              this.responseData = res;
              this.searchIsLoading = false;
              if (this.responseData.status == 'success') {
                this.modalService.open(success, {
                  backdrop: 'static',
                  centered: true,
                });
                this.search();
              }
            });
          }
        });
    }
  }
  dismissModal(modalReference: any) {
    this.modalService.dismissAll();
  }
  calculateDiscount() {
    const storageData = localStorage.getItem('gell_blaster_final');
    const jsonData = JSON.parse(storageData!);
    if(this.bookingForm.value.discount > 100){
      this.bookingForm.controls['discount'].setValue(100)
    }
    this.discountedTotalPrice = Math.round(
      jsonData.price - jsonData.price * (this.bookingForm.value.discount / 100)
    );
    this.discountedPrice = jsonData.price - this.discountedTotalPrice;
  }
  searchCalculateDiscount() {;
    if(this.searchBookingForm.value.discount > 100){
      this.searchBookingForm.controls['discount'].setValue(100)
    }
    this.discountedTotalPrice = Math.round(
      this.responseData.price - this.responseData.price  * (this.searchBookingForm.value.discount / 100)
    );
    this.discountedPrice =     this.responseData.price - this.discountedTotalPrice
  }
  ngAfterViewInit() {
    // console.log(this.printSection!.nativeElement);
  }
  print() {
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
    <span>${this.responseData.id}</span>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
    <span >Game:</span>
    <span>${this.responseData.game_name}</span>
  </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
    <span>Date:</span>
    <span>${this.responseData.select_date}</span>
  </div>
  <p><b>Time Slots</b></p>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
  <ul>
  ${this.responseData.slot_booked.map((element:any) => `<li>${element.book_slot[0].name}</li>`).join('')}
</ul>
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
    <span>Email:</span>
    <span>${this.responseData.email}</span>
 </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
    <span>Player:</span>
    <span>${this.responseData.number_of_player}</span>
 </div>
  <div style="border-top:1px solid #000 ;display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; margin-top:10px ;  padding-top:10px ;">
    <span>Sub Toltal:</span>
    <span>Rs ${this.DecimalPipe.transform(this.responseData.subTotal,'1.0-0')}</span>
 </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
    <span>Discount:</span>
    <span>Rs ${this.DecimalPipe.transform(this.responseData.discount,'1.0-0')}</span>
 </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
    <span>Toltal:</span>
    <span><b>Rs ${this.DecimalPipe.transform(this.responseData.price,'1.0-0')}</b></span>
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
  // Print the new window
}
}
