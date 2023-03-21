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
} from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paintball',
  templateUrl: './paintball.component.html',
  styleUrls: ['./paintball.component.css'],
  providers: [DecimalPipe]
})
export class PaintballComponent {
  minDate: any;
  closeResult = '';
  formControlValue = '';
  nameControl = new FormControl('', [Validators.required]);
  toggleValue: any;
  player: any;
  noData: any = false;

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
  user_submit: any = false;

  // selectControl = new FormControl(this.paymentStatus[0].value);

  constructor(private Api: RequestService, public modalService: NgbModal ,public decimalPipe: DecimalPipe ,private route : Router) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate(),
    };
  }
  @ViewChild('printArea', { static: false })
  // @ViewChild('printSection', {static: false}) printSection!:ElementRef;
  printArea!: ElementRef;
  checkc: any;
  inputNumber: any;
  itemDeleted = false;
  errr = false;
  datee: any;
  slot_number: any;
  submittedd = false;
  submitted = false;
  member_error = false;
  member_error2 = false;
  dltt = true;
  restt = false;
  isInvalid = false;
  numberr: any;
  emaill: any;
  namee: any;
  modal_div = true;
  searches: any;
  count2: any;
  paintball_update: any = FormGroup;
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
  new_div = true;
  new_div2 = true;
  error_msg = false;
  isloading = false;
  isEditing = false;
  submited = false;
  selectedDate: any;
  isDateSelected = false;
  preloaderr = false;
  time_btn: any = [];
  selected_date: any;
  pu: any;
  dataService: any;
  toggle = false;
  slot_id: any;
  slot_name: any;
  arrySlotIndex: any = [];
  totalPrice:any
  subtotalPrice:any
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
  seats = [
    {
      name: 'Slot 1',
      label: 'slot-1',
      checked: false,
      value: 'Available',
      id: 0,
    },
    {
      name: 'Slot 2',
      label: 'slot-2',
      checked: false,
      value: 'Available',
      id: 1,
    },
    {
      name: 'Slot 3',
      label: 'slot-3',
      checked: false,
      value: 'Available',
      id: 2,
    },
    {
      name: 'Slot 4',
      label: 'slot-4',
      checked: false,
      value: 'Available',
      id: 3,
    },
    {
      name: 'Slot 5',
      label: 'slot-5',
      checked: false,
      value: 'Available',
      id: 4,
    },
    {
      name: 'Slot 6',
      label: 'slot-6',
      checked: false,
      value: 'Available',
      id: 5,
    },
    {
      name: 'Slot 7',
      label: 'slot-7',
      checked: false,
      value: 'Available',
      id: 6,
    },
    {
      name: 'Slot 8',
      label: 'slot-8',
      checked: false,
      value: 'Available',
      id: 7,
    },
    {
      name: 'Slot 9',
      label: 'slot-9',
      checked: false,
      value: 'Available',
      id: 8,
    },
    {
      name: 'Slot 10',
      label: 'slot-10',
      checked: false,
      value: 'Available',
      id: 9,
    },
    {
      name: 'Slot 11',
      label: 'slot-11',
      checked: false,
      value: 'Available',
      id: 10,
    },
    {
      name: 'Slot 12',
      label: 'slot-12',
      checked: false,
      value: 'Available',
      id: 11,
    },
    {
      name: 'Slot 13',
      label: 'slot-13',
      checked: false,
      value: 'Available',
      id: 12,
    },
    {
      name: 'Slot 14',
      label: 'slot-14',
      checked: false,
      value: 'Available',
      id: 13,
    },
    {
      name: 'Slot 15',
      label: 'slot-15',
      checked: false,
      value: 'Available',
      id: 14,
    },
    {
      name: 'Slot 16',
      label: 'slot-16',
      checked: false,
      value: 'Available',
      id: 15,
    },
  ];

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
  isLoading = true;
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
  loadingSearch: any;
  cashierName: any;
  discount: number = 0;
  discountedTotalPrice = 0;
  discountedPrice: any = 0;
  availablePlayersSearch: any = 0;
  addPlayerForm: any;

  ngOnInit() {
    const user: any = localStorage.getItem('user');
    const userdata = JSON.parse(user!);
    this.cashierName = userdata.name;
    this.paintball_update = new FormGroup({
      payment_status: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      no_of_player: new FormControl('', [Validators.required]),
      total_price: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      discount: new FormControl(),
      subtotal: new FormControl(),
    });
    this.addPlayerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      usernumber: new FormControl('', [
        Validators.required,
        Validators.pattern('03[0-9]{9}'),
      ]),
      ticket_price:new FormControl('1999'),
      status:new FormControl('1'),
      b_id:new FormControl(''),
    });

    this.booking_data = new FormGroup({
      payment: new FormControl('0', [Validators.required]),
      status: new FormControl('0', [Validators.required]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      number: new FormControl('', [
        Validators.required,
        Validators.pattern('03[0-9]{9}'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      discount: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.max(100),
      ]),
      exclusive: new FormControl(0),
    });
  }

  onDateSelect(event: any, form: NgForm) {
    // console.log(this.selectedDate)
    if (this.inputNumber <= 0 || this.inputNumber > 16) {
      this.member_error2 = false;
      this.member_error = true;

      return;
    } else if (form.invalid) {
      this.member_error2 = true;
      this.member_error = false;

      return;
    }

    this.isDateSelected = true;
    this.preloaderr = true;
    this.selected_date =
      this.selectedDate['day'] +
      '-' +
      this.selectedDate['month'] +
      '-' +
      this.selectedDate['year'];

    this.Api.post(
      'api/slot/slot_check',
      { date: this.selected_date },
      true
    ).subscribe((response: any) => {
      this.time_btn = response;
      this.preloaderr = false;
      localStorage.setItem('date', this.selected_date);
    });
  }
  onPreviousClick() {
    this.isDateSelected = false;
    this.preloaderr = false;
  }
  stringToDate(dateString: string) {
    return moment(dateString).toDate();
  }

  search() {
    this.loadingSearch = true;
    this.Api.post(
      'api/paintball/search',
      { data: this.searches },
      true
    ).subscribe((response: any) => {
      this.responseData = response[0].result;
      this.availablePlayersSearch = response[0].availability;
      this.paintball_update.reset();
      this.checkc = false;
      this.paintball_update.get('payment_status').setValue('');
      this.paintball_update.get('status').setValue('');
      if (this.responseData.length == 0) {
        this.noData = true;
        this.loadingSearch = false;
        this.divs = false;
        this.new_div = true;
        this.div = false;
        setTimeout(() => {
          this.noData = false;
        }, 2000);
      } else {
        this.div = true;
        this.divs = false;
        this.new_div = false;
        this.new_div2 = false;
        this.div = true;
        this.noData = false;
        this.loadingSearch = false;
        this.user_detail = this.responseData;
        this.totalPrice = this.user_detail.total_price 
        this.players = this.responseData.player;
        let i = 0;
        this.loadingSearch = false;
        this.players.forEach((element: any) => {
          if (element.status == 1) {
            i++;
          }
        });
        this.count = i;
        let ex = this.user_detail.exclusivity == 'Exclusive' ? 1000 : 0;
        this.ex_val = this.count * this.user_detail.each_amount + ex;
        this.paintball_update.patchValue({
          no_of_player: this.count,
          total_price: this.ex_val,
          id: this.user_detail.id,
        });
      }
    },(error:any)=>{
      if(error.status ==  500){
        this.noData = true;
        this.loadingSearch = false;
        this.divs = false;
        this.new_div = true;
        this.div = false;
        setTimeout(() => {
        this.noData = false
      }, 2000);
      }
    });
  }
  update_players(e: any, s: any) {
    const user = localStorage.getItem('user')
    const userJson = JSON.parse(user!) 
    if (s == true) {
      this.isloading = true;
      let arr = {
        id: e,
        b_id:this.user_detail.id,
        no_of_players: parseInt(this.user_detail.no_of_players) - 1,
        total_price: parseInt(this.user_detail.total_price) - 1999,
        user_id:userJson.id,
        status: 2,
      };
      this.Api.post('api/paintball/players', arr, true).subscribe(
        (response: any) => {
          this.search();
          this.isloading = false;
        }
      );
    } else {
      this.isloading = true;
      let arr = {
        id: e,
        b_id:this.user_detail.id,
        no_of_players: parseInt(this.user_detail.no_of_players) + 1,
        total_price: parseInt(this.user_detail.total_price) + 1999,
        user_id:userJson.id,
        status: 1,
      };
      this.Api.post('api/paintball/players', arr, true).subscribe(
        (response: any) => {
          this.search();
          this.isloading = false;
        }
      );
    }
  }
  onsubmit(modal: any) {
    console.log(this.paintball_update);
    this.checkc = true;
    if (this.paintball_update.valid) {
      this.confirm(modal);
    }
  }
  rules() {
    this.pu = this.paintball_update.controls;
  }
  boxes() {
    this.div = false;
    this.new_div = true;
    this.new_div2 = true;
    this.divs = false;
  }
  open(content: any, btn: any) {
    if (btn.book_status == 'Deactive') {
      return;
    }
    this.slot_id = btn.id;
    this.slot_name = btn.name;

    let d = {
      date: this.selected_date,
      id: btn.id,
    };
    this.datee = d.date;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.loadingSlots = true;
    this.Api.post('api/slot/slot_index', d, true).subscribe((response: any) => {
      response.forEach((element: any) => {
        $('#' + element.index + 'a')
          .parent()
          .empty()
          .addClass(
            `${element.book_status == 'Booked' ? 'slot_booked' : 'slot_box2'}`
          )
          .append(
            `<span style="font-size: 15px;line-height: 1.2;text-align: center;" >${
              element.book_status == 'Booked'
                ? element.name
                : 'Expires at <span style="color:#4aff3e;padding-top:4px;font-size: 12px;">' +
                  element.exp_date +
                  '</span>'
            }</span>`
          );
      });
      this.loadingSlots = false;
    });
  }
  checkNumber() {
    if (this.number.length == 11) {
      if (this.matchNumberArray.includes(this.number)) {
        this.numberMatched = true;
      } else {
        this.numberMatched = false;
      }
      this.Api.post('api/player', { number: this.number }, true).subscribe(
        (res: any) => {
          // console.log(this.name = res.name)
        }
      );
    }
  }
  bookSlot(seat: any, i: any) {
    if (
      this.name !== undefined &&
      this.name !== undefined &&
      this.name !== '' &&
      this.name !== ''
    ) {
      // console.log(this.exclusive)
      this.editIcon = true;
      seat.value = this.name;
      this.arryData[i] = this.name;
      this.arrynumbers[i] = this.number;
      this.matchNumberArray.push(this.number);
      this.arrySlotIndex[i] = i;
      this.booked = true;
      this.checkboxValue[i] = true;
      this.submited = true;
      let a = [];

      // console.log(this.arrynumbers.length);
      for (let i = 0; i < this.arrynumbers.length; i++) {
        if (this.arrynumbers[i] != undefined) {
          // console.log(this.arrynumbers[i]);
          a.push({ number: this.number[i] });
        }
      }

      this.addedPlayers = a.length;
      // console.log(this.addedPlayers)
      // this.slot_number = this.arrynumbers.length

      setTimeout(() => {
        this.booked = false;
        this.selected = false;
        this.name = '';
        this.number = '';
      }, 500);
    }
    if (
      this.name == undefined ||
      this.number == undefined ||
      this.number == '' ||
      this.name == ''
    ) {
      this.submited = false;
    }
  }

  uncheckCheckbox(seat: any, i: any) {
    seat.checked = false;
    seat.value = 'Available';
    this.selected = 'null';
    this.checkboxValue[i] = false;
    this.arryData.splice(i, 1);
    this.arrynumbers.splice(i, 1);
    this.addedPlayersArr.splice(1, 1);
    this.addedPlayers = this.arryData.length;
    this.numberMatched = false;
    this.submited = true;
  }
  // data_store(){
  //   console.log(this.inputNumber)
  // }

  // send data
  sendData() {
    const data = {
      slotName: this.slotName,
      player_info: this.arr,
      exclusive: this.getexclusive,
    };
    // console.log(this.arr)
    const token = false;
    localStorage.setItem('booking_final', JSON.stringify(data));
  }
  // send data
  goToNextPage(pageName: string, content: any) {
    this.divs = true;
    this.new_div2 = false;
    this.arr = [];
    for (let i = 0; i < this.arrynumbers.length; i++) {
      if (this.arrynumbers[i] != undefined) {
        this.arr.push({
          player: this.arryData[i],
          number: this.arrynumbers[i],
          slot_index: parseInt(this.arrySlotIndex[i]),
          ticket_price: '1999',
        });
      }
    }
    if (this.addedPlayers == this.inputNumber) {
      this.sendData();
      this.modalService.dismissAll(content);
      // console.log(this.arr);
      this.player_response = this.arr;
      this.user_detail2 = this.player_response[0];
      this.players2 = this.player_response[0].player;
      this.ex_val2 = this.addedPlayers * this.user_detail2.ticket_price;
      this.discountedTotalPrice = this.ex_val2;
    } else {
      this.errr = true;
      this.new_div2 = true;
      this.divs = false;
    }
  }

  // }
  onSubmitt(confirm: any, success: any) {
    this.submitted = true;
    this.checkc = true;
    if (this.booking_data.valid) {
      this.modalService
        .open(confirm, { backdrop: 'static', centered: true })
        .result.then((result) => {
          if (result == 'yes') {
            console.log(this.booking_data);
            const playersData: any = localStorage.getItem('booking_final');
            const finalData = JSON.parse(playersData);
            const playersData2: any = localStorage.getItem('booking_final');
            const finalData2 = JSON.parse(playersData2);
            const user: any = localStorage.getItem('user');
            const userdata = JSON.parse(user!);
            const data = {
              date: localStorage.getItem('date'),
              name: this.booking_data.value.name,
              phone_no: this.booking_data.value.number,
              email: this.booking_data.value.email,
              exclusivity:
                this.booking_data.value.exclusive == 1 ? 'Yes' : 'N/A',
              payment_status: 'Paid',
              book_status: 'Booked',
              player_info: finalData.player_info,
              no_of_players: this.inputNumber,
              type: 'Employee',
              userr_id: finalData2.id,
              total_price: this.discountedTotalPrice,
              each_amount: 1999,
              time_slot: this.slot_id,
              user_id: userdata.id,
              discount: this.discountedPrice,
              subTotal: this.discountedPrice + this.discountedTotalPrice,
            };
            this.Api.post('api/paintball/store', data, true).subscribe(
              (res) => {
                this.responseData = res;
                if (this.responseData.status == 'success') {
                  this.modalService.open(success, {
                    backdrop: 'static',
                    centered: true,
                  });
                  this.route.navigate(['/all-bookings'])
                }
              }
            );
          }
        });
    }
  }
  onCheckboxChange() {
    if (this.booking_data.get('exclusive').value) {
      this.discountedTotalPrice = this.discountedTotalPrice + 1000;
    } else {
      this.discountedTotalPrice = this.discountedTotalPrice - 1000;
    }
  }
  deleteItem() {
    this.itemDeleted = true;
    // console.log()
  }
  restoreItem() {
    this.itemDeleted = false;
  }
  confirm(content: any) {
    const data = {
      payment_status:this.paintball_update.value.payment_status,
      status:this.paintball_update.value.status,
      no_of_player:this.paintball_update.value.no_of_player,
      total_price:this.totalPrice,
      id:this.paintball_update.value.id,
      subtotal:this.user_detail.subtotal??this.user_detail.total_price,
      discount:this.discountedPrice,
    }

    const modalRef = this.modalService
      .open(content, { backdrop: 'static', centered: true })
      .result.then(
        (result) => {
          if (result == 'yes') {
            this.Api.post(
              'api/paintball/update',
              data,
              true
            ).subscribe((response: any) => {
              this.search();
              this.print();
            });
          }
        },
        (reason) => {
          console.log(reason);
        }
      );
  }
  // PRINT
  print() {
    console.log('here');
    let printContents, popupWin:any;
    printContents = this.printArea.nativeElement.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=10%,width=auto');
    if (!popupWin) {
      console.log('Popup was blocked please allow pop-ups for this page');
      return;
    }
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
        </head>
        <style>
        @font-face {
          font-family: "jersey";
          src: url("../../../assets/fonts/Jersey M54.rtf");
        }
 
@media print {
  .footer {page-break-after: always;}
}
</style>
<script>
console.log('sss')
// print the bill without showing the print dialog popup
</script>
        <body>${printContents}</body>
      </html>
      `);
      //  popupWin.document.close();
      setTimeout(() => {
        popupWin.window.print();
        popupWin?.close();
    }, 1000);
  }
 
  calculateDiscount() {
    if (this.booking_data.value.discount > 100) {
      this.booking_data.controls['discount'].setValue(100);
    }
    this.discountedTotalPrice = Math.round(
      this.ex_val2 - this.ex_val2 * (this.booking_data.value.discount / 100)
    );
    this.discountedPrice = this.ex_val2 - this.discountedTotalPrice;
    console.log(this.discountedPrice);
  }
  searchCalculateDiscount() {
    if (this.paintball_update.value.discount > 100) {
      this.paintball_update.controls['discount'].setValue(100);
    }
    this.discountedTotalPrice = Math.round(
      this.user_detail.total_price - this.user_detail.total_price * (this.paintball_update.value.discount / 100)
    );
    this.discountedPrice = this.user_detail.total_price - this.discountedTotalPrice;
    this.totalPrice = this.discountedTotalPrice
    console.log(this.discountedPrice)
  }
  openAddPlayer(content: any) {
    this.modalService.open(content, { centered: true });
  }
  addPlayerRequest() {
    this.user_submit = true;
    this.addPlayerForm.patchValue({
      b_id: this.responseData.id,
    })
    if (this.addPlayerForm.valid) {
      const user = localStorage.getItem('user')
      const userJson = JSON.parse(user!)
      const data = {
        b_id:this.addPlayerForm.value.b_id,
        name: this.addPlayerForm.value.username,
        phone: this.addPlayerForm.value.usernumber,
        status: this.addPlayerForm.value.status,
        ticket_price: this.addPlayerForm.value.ticket_price,
        total_price:parseInt(this.responseData.total_price) +  parseInt(this.addPlayerForm.value.ticket_price),
        no_of_player:parseInt(this.responseData.no_of_players) + 1,
        user_id:userJson.id
      };
      this.Api.post('api/paintball/add_player',data,true).subscribe((res:any)=>{
        console.log(res)
        this.modalService.dismissAll()
        this.search()
      })
    }
  }
}
