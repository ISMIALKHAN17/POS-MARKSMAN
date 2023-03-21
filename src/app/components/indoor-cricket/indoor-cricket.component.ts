import { Component, ViewChild, ElementRef } from '@angular/core';
import { RequestService } from '../../Services/request.service';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DecimalPipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormBuilder,
} from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModule,
  NgbTimepickerConfig,
  NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indoor-cricket',
  templateUrl: './indoor-cricket.component.html',
  styleUrls: ['./indoor-cricket.component.css'],
  providers: [DecimalPipe]
})
export class IndoorCricketComponent {
  minDate: any;
  closeResult = '';
  formControlValue = '';
  form: any;
  bookingForm: any;
  ms: any;
  isCheck: any = false;
  constructor(
    private Api: RequestService,
    private modalService: NgbModal,
    public calendar: NgbCalendar,
    config: NgbTimepickerConfig,
    private fba: FormBuilder,
    private datePipe: DatePipe,
    public router: Router,
    public decimalPipe: DecimalPipe,
  ) {
    this.bookingForm = this.fba.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern('03[0-9]{9}')]],
      discount: [''],
      payment_status: ['Paid'],
      bookingsStatus: ['Booked'],
    });
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
    config.spinners = false;
    this.form = this.fba.group({
      name: [''],
      number: [''],
    });
  }
  resuilt = false;
  new_div = true;
  booking = false;
  @ViewChild('printArea', { static: false })
  printArea!: ElementRef;
  inputNumber: any;
  itemDeleted = false;
  errr = false;
  datee: any;
  slot_number: any;
  submittedd = false;
  submitted = false;
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
  error_msg = false;
  isloading = false;
  isEditing = false;
  submited = false;
  selectedDate: any;
  isDateSelected = false;
  preloaderr = false;
  isLoading: any;
  time_btn: any = [];
  selected_date: any;
  pu: any;
  dataService: any;
  toggle = false;
  slot_id: any;
  slot_name: any;
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
  numberMatched = false;
  exclusive: any;
  exclusiveCheck: any;
  getexclusive: any;
  timeSlots = [];
  SlotsIndex = [];
  selectedTime: any;
  checkBoxChecked: any;
  userData: any;
  jsonUserData: any;
  showSpan = false;
  selected: any;
  booked = false;
  checkboxValue: any = [];
  arryData: any = [];
  arrynumbers: any = [];
  fromTime: any = 'default';
  toTime: any = 'default';
  fromMin: any = 'default';
  toMin: any = 'default';
  fromType: any = 'AM';
  toType: any = 'AM';
  errorMessage: string = '';
  value = 0;
  step = 1;
  bookedTimes: any;
  formGroup: any = [];
  fb: any;
  nameInput: any;
  emailInput: any;
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
  discount:number = 0
  discountedPrice:any = 0
  discountedTotalPrice = 0
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
  // bookingStatus = false
  returnBookingData: any;
  mStartTime: any;
  mEndTime: any;
  check24Hours: any;
  check24HoursError = false;
  markDisable: any = true;
  diffHours: any;
  remaining_time: any;
  config: any;
  loginStatus: any;
  hourCheck: any;
  cName: any;
  cEmail: any;
  cNumber: any;
  loadingSearch = false
  noData = false
  paintball_update: any = FormGroup;
  searchBox:any = false
  resBooking:any 
  searchIsLoading:any  = false
  searchError:any = false
  paymentStatus = [
    { value: '', label: 'Payment Staus ' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' },
  ];
  bookingStatus = [
    { value: '', label: 'Booking Status' },
    { value: 'Booked', label: 'Booked' },
    { value: 'Cancel', label: 'Cancel' },
  ];
  paymentStatus2 = [
    { value: '', label: 'Payment Staus ' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Unpaid', label: 'Unpaid' },
  ];
  bookingStatus2 = [
    { value: '', label: 'Booking Status' },
    { value: 'Booked', label: 'Booked' },
    { value: 'Cancel', label: 'Cancel' },
  ];
  // selectControl = new FormControl(this.paymentStatus[0].value);
  endTimeCheck = [
    { value: 12, name: 12 },
    { value: 13, name: 1 },
    { value: 14, name: 2 },
    { value: 15, name: 3 },
    { value: 16, name: 4 },
    { value: 17, name: 5 },
    { value: 18, name: 6 },
    { value: 19, name: 7 },
    { value: 20, name: 8 },
    { value: 21, name: 9 },
    { value: 22, name: 10 },
    { value: 23, name: 11 },
  ];
  timecheck = ['00', '15', '30', '45'];
  mminDate: NgbDateStruct = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };
  maxDate: NgbDateStruct = {
    year: new Date().getFullYear() + 1,
    month: 12,
    day: 31,
  };
  time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };

  ngOnInit() {
    this.cricket_update = new FormGroup({
      payment_status: new FormControl('Paid'),
      book_status : new FormControl('Booked'),
      id: new FormControl('', [Validators.required]),
      user_id: new FormControl('', [Validators.required]),
    });
  }
  search() {
    this.divs = false;
    this.new_div = false;
    this.new_div2 = false;
    this.div = true;
    this.searchIsLoading = true
    this.Api.post(
      'api/cricket/search',
      { data: this.searches },
      true
      ).subscribe((response: any) => {
        this.responseData = response;
        console.log()
        if(this.responseData.data.length == 0){
          this.searchIsLoading = false
          this.searchError = true
          setTimeout(() => {
            this.searchError = false
            this.divs = true;
            this.new_div = true;
            this.new_div2 = true;
            this.div = false;
            
          }, 2000);
        }else{
          this.responseData = this.responseData.data
          this.loadingSearch = true
         
          this.searchIsLoading = false
          this.searchError = false
          console.log(this.responseData.expiry_time)
        }
    });
  }
  onDateSelect(event: any, form: NgForm) {
    // console.log(this.selectedDate)
    if (this.inputNumber <= 0 || this.inputNumber > 12) {
      this.member_error2 = false;
      this.member_error = true;

      return;
    } else if (form.invalid) {
      this.member_error2 = true;
      this.member_error = false;

      return;
    }

    this.isDateSelected = true;
    this.selected_date =
      this.selectedDate['month'] +
      '/' +
      this.selectedDate['day'] +
      '/' +
      this.selectedDate['year'];

    console.log(this.selected_date);
    console.log(this.inputNumber);
    this.booking = true;
    this.isLoading = true;
    this.mStartTime = String(
      `${this.selectedDate['year']}-0${this.selectedDate['day']}-${this.selectedDate['month']} `
    );
    this.mEndTime = String(
      `${this.selectedDate['year']}-0${this.selectedDate['day']}-${this.selectedDate['month']} `
    );
    this.check24Hours = String(
      `${this.selectedDate['year']}-0${this.selectedDate['month']}-${this.selectedDate['day']} `
    );
    console.log(this.mStartTime);
    console.log(this.mStartTime);
    console.log(this.check24Hours);
    this.step = 2
    this.Api.post(
      'api/cricket/booking_search/date',
      { select_date: this.selected_date },
      true
    ).subscribe((res) => {
      this.bookedTimes = res;
      this.isLoading = false;
      console.log(this.bookedTimes);
    });
  }

  checkValidity() {
    console.log(this.fromTime);
    if (this.fromTime > 11) {
      this.fromType = 'PM';
    } else {
      this.fromType = 'AM';
    }
    if (this.toTime > 11) {
      this.toType = 'PM';
    } else {
      this.toType = 'AM';
    }
    this.selectedFromTime = `${this.fromTime}:${this.fromMin} ${this.fromType}`;
    this.selectedToTime = `${this.toTime}:${this.toMin} ${this.toType}`;
    if (
      this.checkBookedTimes(
        this.selectedFromTime,
        this.selectedToTime,
        this.bookedTimes,
        this.fromTime,
        this.toTime
      )
    ) {
      this.errorMessage = 'Selected time is already booked';
      this.markDisable = true;
    } else {
      if (
        this.selectedFromTime == this.selectedToTime ||
        this.fromTime > this.toTime
      ) {
        this.errorMessage = 'Please Choose Valid Time ! ';
        this.markDisable = true;
      } else {
        this.errorMessage = '';
        this.markDisable = false;
      }
    }
  }
  checkBookedTimes(
    startTime: any,
    endTime: any,
    bookedTimes: any[],
    startHour: any,
    endHour: any
  ) {
    let isBooked = false;
    bookedTimes.filter((time) => {
      console.log(
        `start time ${startTime} - end time ${endTime} database time ${time.to}`
      );
      if (
        (startTime >= time.from && startTime <= time.to) ||
        (endTime >= time.from && endTime <= time.to) ||
        (startHour < time.hourFrom && startHour > time.hourTo)
      ) {
        isBooked = true;
      }
    });
    return isBooked;
  }
  // saveData
  sendForm() {
    this.rule();
    if (this.formGroup.valid) {
      let local = localStorage.setItem(
        'cricket_booking_form',
        JSON.stringify(this.formGroup.value)
      );
      this.step = 2;
      return;
    } else {
      // alert('error')
    }
    this.submitted = true;
  }
  rule() {
    this.fb = this.formGroup.controls;
  }
  // saveData
  submitData() {
    let startTimeString = `${this.mStartTime}${this.selectedFromTime}`;
    let endTimeString = `${this.mEndTime}${this.selectedToTime}`;
    let startTime = moment(startTimeString, 'YYYY-MM-DD HH:mm a');
    let endTime = moment(endTimeString, 'YYYY-MM-DD HH:mm a');
    let difference = endTime.diff(startTime, 'minutes', true);
    let hoursDifference = Math.floor(difference / 60);
    let minutesDifference = Math.round(difference % 60);
    let bookedFor = hoursDifference + ' Hours ' + minutesDifference + ' Minutes';
    // Getting Time Diffrance
    const total = Math.round(difference * 66.65)
  

    let startTimeString2 = `${this.check24Hours}${this.selectedFromTime}`;

    let selectedTime = moment(startTimeString2, 'YYYY-MM-DD hh:mm a');
    let now = moment();
    let difference2 = selectedTime.diff(now, 'hours', true);
    let roundedDifference = Math.round(difference2);

    let Starttime = this.selectedFromTime;
    let hours = parseInt(Starttime.substr(0, 2));
    let minutes = Starttime.substr(3, 2);
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    Starttime = `${hours}:${minutes} ${ampm}`;

    let Endtime = this.selectedToTime;
    let ehours = parseInt(Endtime.substr(0, 2));
    let eminutes = Endtime.substr(3, 2);
    let eampm = ehours >= 12 ? 'PM' : 'AM';
    ehours = ehours % 12;
    ehours = ehours ? ehours : 12;
    Endtime = `${ehours}:${eminutes} ${eampm}`;

    let checkHours = hoursDifference;

    if (roundedDifference < 24) {
      // this.check24HoursError = true
    }
    if (checkHours === 0) {
      this.hourCheck = true;
    } else {
      if (roundedDifference > 48 || !this.markDisable) {
        this.hourCheck = false;
        let now = moment();
        let futureTime = now.add(24, 'hours');
        this.diffHours = futureTime.format('DD-MM-YYYY hh:mm:ss a');
        console.log(this.diffHours);
        this.remaining_time = 24;
        this.step = 4;
      } else if (
        (roundedDifference > 24 && roundedDifference < 48) ||
        !this.markDisable
      ) {
        let now = moment();
        let futureTime = now.add(12, 'hours');
        this.diffHours = futureTime.format('DD-MM-YYYY hh:mm:ss a');
        console.log(this.diffHours);
        console.log(hoursDifference);
        this.remaining_time = 12;
        this.step = 4;
      }
    }

    // this.totalSelectedPlayers = jsonUserData.no_of_players
    this.totalPlayerArray = [];
    for (let i = 1; i <= this.inputNumber; i++) {
      this.totalPlayerArray.push(i);
    }
    this.totalPlayerArray.forEach((player: any) => {
      this.form.addControl(
        `name_${player}`,
        new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]+$/),
        ])
      );
      this.form.addControl(
        `number_${player}`,
        new FormControl('', [
          Validators.required,
          Validators.pattern(/^03[0-9]{9}$/),
        ])
      );
    });

    const data = {
      no_of_players: this.inputNumber,
      date: this.selected_date,
      from: this.selectedFromTime,
      to: this.selectedToTime,
      fromHour: this.fromMin,
      toHour: this.toMin,
      booked_for: bookedFor,
      user_start_time: Starttime,
      user_end_time: Endtime,
      expiry_time: this.diffHours,
      price:total
    };
    localStorage.setItem('cricket_booking_final', JSON.stringify(data));

    const localData = localStorage.getItem('cricket_booking_final');
    const jsonData = JSON.parse(localData!);

    this.finalData = {
      totalPlayers: jsonData.no_of_players,
      date: this.selectedDate,
      startTime: this.selectedFromTime,
      endTime: this.selectedToTime,
      price: jsonData.price,
      booked_for: bookedFor,
      user_start_time: Starttime,
      user_end_time: Endtime,
      expiry_time: jsonData.expiry_time,
      remaining_hours: this.remaining_time,
    };
    this.discountedTotalPrice = jsonData.price
    // localStorage.setItem('cricket_booking_final', JSON.stringify(this.finalData));
  }
  saveData(content: any,success:any) {
    this.isCheck = true;
    console.log(this.bookingForm);
    if (this.bookingForm.valid) {
      console.log(1);
      this.modalService
        .open(content, { backdrop: 'static', centered: true })
        .result.then(
          (result) => {
            if (result == 'yes') {
              let arr = [];
              for (let i = 1; i <= this.inputNumber; i++) {
                console.log(1);
                arr.push({
                  name: this.form.get(`name_${i}`)?.value,
                  number: this.form.get(`number_${i}`)?.value,
                  ticket_price: this.ticket_price,
                });
              }
              this.confirmBookingForm = this.form.controls;
              const localData = localStorage.getItem('cricket_booking_final');
              const jsonData = JSON.parse(localData!);
              const user = localStorage.getItem('user')
              const userJson = JSON.parse(user!)
              const finalData = {
                name: this.bookingForm.value.name,
                email: this.bookingForm.value.email,
                phone_no: this.bookingForm.value.number,
                number_of_player: this.inputNumber,
                select_date: this.selected_date,
                from: this.selectedFromTime,
                to: this.selectedToTime,
                hourFrom: this.fromTime,
                hourTo: this.toTime,
                price:this.discountedTotalPrice ,
                discount:this.discountedPrice ,
                subTotal:jsonData.price,
                players: arr,
                booked_for: jsonData.booked_for,
                user_start_time: jsonData.user_start_time,
                user_end_time: jsonData.user_end_time,
                expiry_time: jsonData.expiry_time,
                book_status:'Booked',
                payment_status:'Paid',
                user_id:userJson.id
              };

          

              localStorage.setItem(
                'cricket_booking_final2',
                JSON.stringify(finalData)
              );
              console.clear;
              console.log(finalData);
              this.Api.post(
                'api/cricket/booked',
               finalData,
                true
              ).subscribe((res:any) => {
                //  this.bookingStatus = true
                this.resBooking = res;
                this.responseData = this.resBooking.data[0]
                this.bookingForm.reset()
                this.form.reset()
                this.fromTime = 'default';
                this.toTime = 'default';
                this.fromMin = 'default';
                this.toMin = 'default';
                this.totalPlayerArray = []
                if(this.resBooking.status == 'success'){
                  this.modalService.open(success, { backdrop: 'static', centered: true })
                  this.print()
                  
                }
              });
            }
          },
          (reason) => {
            console.log(reason);
          }
        );

      return;
    } else {
      this.displayErrors = true;
    }
  }
  // get Players data
  checkNumber(player: any, event: any) {
    if (event.length == 11) {
      this.Api.post('api/player', { number: event }, true).subscribe(
        (res: any) => {
          console.log((this.name = res.name));
          this.form.get(`name_${player}`)?.setValue(res.name);
        }
      );
      if (this.numbersArry.includes(event)) {
        console.log('number already exist');
        this.numberMatched = true;
        //get the specific form control and set its status to 'INVALID'
        this.form.get(`number_${player}`)?.setErrors({ invalid: true });
      } else {
        this.numbersArry[player] = event;
        console.log('number added' + this.numbersArry);
        this.numberMatched = false;
        this.form.get(`number_${player}`)?.setErrors(null);
      }
    }
  }
  runTimer(hours: any) {
    this.config = {
      leftTime: hours * 60 * 60,
      template: '$!h!:!m!:!s!',
      notify: [60, 30, 10, 5, 2, 1],
    };
  }

  back(){
    this.isDateSelected = true;
    this.step = 0;
    this.new_div  = true
  };

  // PRINT
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
  <span>${this.responseData.user_start_time} to ${this.responseData.user_end_time}</span>
  <ul>
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
    <span>${this.decimalPipe.transform(this.responseData.subtotal,'1.0-0')}</span>
 </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ;">
    <span>Discount:</span>
    <span>${this.decimalPipe.transform(this.responseData.discount,'1.0-0')}</span>
 </div>
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom:5px ; border-bottom:1px solid #000 ; padding-bottom:10px ;">
    <span>Toltal:</span>
    <span><b>${this.decimalPipe.transform(this.responseData.price,'1.0-0')}</b></span>
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

  onsubmit(confirm:any){
    const user = localStorage.getItem('user')
    const userJson = JSON.parse(user!)
    this.cricket_update.patchValue({
      id: this.responseData.id,
      user_id: userJson.id
    });

    this.modalService
        .open(confirm, { backdrop: 'static', centered: true })
        .result.then(
          (result) => {
            if (result == 'yes'){
              this.Api.post('api/cricket/data/update', this.cricket_update.value, true).subscribe(
                (response: any) => {

                }
              );
            }
          },
          (reason) => {
            console.log(reason);
          }
        );  
  }
  update_players(e: any, s: any) {
    if (s == true) {
      this.isloading = true;
      let arr = {
        id: e,
        status: 2,
      };
      this.Api.post('api/cricket/player/update', arr, true).subscribe(
        (response: any) => {
          this.search();
          this.isloading = false;
        }
      );
    } else {
      this.isloading = true;
      let arr = {
        id: e,
        status: 1,
      };
      this.Api.post('api/cricket/player/update', arr, true).subscribe(
        (response: any) => {
          this.search();
          this.isloading = false;
        }
      );
    }
    console.log(e.target.checked);
  }
  boxes() {
    this.div = false;
    this.new_div = true;
    this.new_div2 = true;
    this.divs = false;
  }
  onCheckboxChange() {
    if (this.booking_data.get('exclusive').value) {
      this.ex_val2 = this.ex_val2 + 1000;
    } else {
      this.ex_val2 = this.ex_val2 - 1000;
    }
  }
  deleteItem() {
    this.itemDeleted = true;
    // console.log()
  }
  restoreItem() {
    this.itemDeleted = false;
  }
  calculateDiscount() {
    const localData = localStorage.getItem('cricket_booking_final');
    const jsonData = JSON.parse(localData!);
    if(this.bookingForm.value.discount > 100){
      this.bookingForm.controls['discount'].setValue(100)
    }
    if(this.bookingForm.value.discount < 0){
      this.bookingForm.controls['discount'].setValue(0)
    }
    this.discountedTotalPrice = Math.round(jsonData.price - (jsonData.price * (this.bookingForm.value.discount / 100)));
    this.discountedPrice = jsonData.price - this.discountedTotalPrice 
    console.log(this.discountedPrice)
  }
}
