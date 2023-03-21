import { Component } from '@angular/core';
import { RequestService } from 'src/app/Services/request.service';
import {DatePipe, DecimalPipe} from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[DecimalPipe]
})
export class DashboardComponent {
  totalRevenue:any 
  data:any
  model:any
  selectedDate:any
  userId:any
  userName:any
  isLoading:any = false
  time = new Date();
  intervalId:any



  constructor(public request:RequestService , public decimalPipe:DecimalPipe,public datePipe:DatePipe){}

  ngOnInit(): void {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.isLoading = true
    this.selectedDate = (new Date()).toISOString().substring(0,10)
    this.selectedDate =  this.datePipe.transform(this.selectedDate, 'd/M/yyyy');
    const user = localStorage.getItem('user')
    const userJson = JSON.parse(user!)
    this.userId = userJson.id
    this.userName = userJson.name
    const  userRole = userJson.role == 'Admin'? 'All' : userJson.id;
    this.request.post('api/reports',{user_id:userRole,select_date:this.selectedDate},true).subscribe((res:any)=>{
      this.data =  res[0]
      this.isLoading = false
    })
  }

  userRevenue(data:any){
    this.isLoading = true
  this.userId = data.target. value
  this.request.post('api/reports',{user_id:data.target.value,date:''},true).subscribe((res:any)=>{
    this.data =  res[0]
    this.userName = this.data.employeeDetail.id??0
    this.isLoading = false
  })
  }

  onDateChange() {
    this.isLoading = true // do something with the selected date
   this.selectedDate =  this.datePipe.transform(this.selectedDate, 'd/M/yyyy');
    this.request.post('api/reports',{user_id:this.userId,select_date:this.selectedDate},true).subscribe((res:any)=>{
      this.data = res[0]
      this.isLoading = false 
    })
  }

  print(){
    // Open a new window
    var myWindow = window.open('', 'myWindow', 'width=1600,height=1000');
    var d = new Date();
  
    // Write some dynamic HTML content to the new window
    var dynamicContent = `
    <div style="text-align: center;font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
            <h3>Marksman Sales Report</h3>
            <h4>Date : ${this.selectedDate} <br> <span>Print Time : ${d.getHours()}:${d.getMinutes()} </span><br> <span>User : ${this.userName}</span></h4>
            <h5></h5>
        </div>
    <table class="table" border="1px" style="width:100%;font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
    <tr>
        <th style="text-align:left;padding-left:5px;">#</th>
        <th style="text-align:left;padding-left:5px;">Game</th>
        <th style="text-align:left;padding-left:5px;"> Bookings</th>
        <th style="text-align:left;padding-left:5px;"> Revenue</th>
    </tr>
    <tr>
        <td style="padding-left:5px;">1</td>
        <td style="padding-left:5px;">Paintball</td>
        <td style="padding-left:5px;">${this.data.paintballTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.paintballTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">2</td>
        <td style="padding-left:5px;">Indoor Cricket</td>
        <td style="padding-left:5px;">${this.data.cricketTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.cricketTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">3</td>
        <td style="padding-left:5px;">Archery</td>
        <td style="padding-left:5px;">${this.data.archeryTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.archeryTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">4</td>
        <td style="padding-left:5px;">Airsoft</td>
        <td style="padding-left:5px;">${this.data.airsoftTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.airsoftTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">5</td>
        <td style="padding-left:5px;">Gel Blaster</td>
        <td style="padding-left:5px;">${this.data.gelblasterTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.gelblasterTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">6</td>
        <td style="padding-left:5px;">Badminton</td>
        <td style="padding-left:5px;">${this.data.badmintonTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.badmintonTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
</table>
<div class="total" style="font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;text-align:right;">
    <h3 style="display:inline-block;border-bottom: 1px solid #000;">Total Revenue: ${this.decimalPipe.transform(this.data.totalPrice,'1.0-0')}</h3>
</div>
    `;
    myWindow!.document.write(dynamicContent);
    setTimeout(() => {
      myWindow!.window.print();
    }, 1000);
}

}
