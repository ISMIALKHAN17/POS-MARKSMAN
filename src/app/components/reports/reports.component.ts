import { Component } from '@angular/core';
import { RequestService } from 'src/app/Services/request.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers:[DecimalPipe]
})
export class ReportsComponent {
  totalRevenue:any 
  data:any
  model:any
  selectedDate:any
  userId:any
  userName:any
  isLoading:any = false
  userRole:any
  alluser:any;
  collectionAmount:any 
  TotalAmount:any
  balanceAmount:any
  errorBorder:any = false




  constructor(public request:RequestService , public decimalPipe:DecimalPipe,public datePipe:DatePipe , private route:Router , public modalService:NgbModal){}

  ngOnInit(): void {
    this.selectedDate = (new Date()).toISOString().substring(0,10)
    this.selectedDate =  this.datePipe.transform(this.selectedDate, 'd/M/yyyy');
    this.isLoading = true
    const user = localStorage.getItem('user')
    const userJson = JSON.parse(user!)
    this.userId = 'All'
    this.userName  = 'All'
    this.userRole = userJson.role
    if(this.userRole != 'Admin'){
      this.route.navigate([''])
    }
    this.request.post('api/reports',{user_id:'All',select_date:this.selectedDate},true).subscribe((res:any)=>{
      this.data =  res[0]
      this.isLoading = false
    })
    this.allusers();
  }
  userRevenue(data:any){
    this.isLoading = true
  this.userId = data.target.value
  this.request.post('api/reports',{user_id:data.target.value,select_date:this.selectedDate},true).subscribe((res:any)=>{
    this.data =  res[0]
    if(this.data.employeeDetail ){
      this.userName = this.data.employeeDetail.name 
      this.TotalAmount = this.data.employeeDetail.totalRevenue ?? 0
      this.collectionAmount = this.data.employeeDetail.collectedAmount ?? 0
      this.balanceAmount = this.data.employeeDetail.balance ?? 0
    }else{

      this.userName = 'All' 
    }
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
    // Write some dynamic HTML content to the new window
    var dynamicContent = `
    <div style="text-align: center;font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
            <h3>Marksman Sales Report</h3>
            <h4 style="display:flex;justify-content: space-between;">Date : ${this.selectedDate} <span>User : ${this.userName}</span></h4>
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
        <td style="padding-left:5px;">#1</td>
        <td style="padding-left:5px;">Paintball</td>
        <td style="padding-left:5px;">${this.data.paintballTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.paintballTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">#2</td>
        <td style="padding-left:5px;">Indoor Cricket</td>
        <td style="padding-left:5px;">${this.data.cricketTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.cricketTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">#4</td>
        <td style="padding-left:5px;">Archery</td>
        <td style="padding-left:5px;">${this.data.archeryTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.archeryTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">#5</td>
        <td style="padding-left:5px;">Airsoft</td>
        <td style="padding-left:5px;">${this.data.airsoftTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.airsoftTotalPrice,'1.0-0') ?? 0}</td>
    </tr>
    <tr>
        <td style="padding-left:5px;">#6</td>
        <td style="padding-left:5px;">Gel Blaster</td>
        <td style="padding-left:5px;">${this.data.gelblasterTotalBooking ?? 0}</td>
        <td style="padding-left:5px;">${this.decimalPipe.transform(this.data.gelblasterTotalPrice,'1.0-0') ?? 0}</td>
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
allusers(){
  this.request.get('api/allusers',true).subscribe((res:any)=>{
    this.alluser  = res;
  })
    
}


collectRevnue(collect:any){
  this.modalService.open(collect,{centered:true})
}
updateCollection(){
  this.errorBorder = this.collectionAmount > this.balanceAmount? true : false 
  this.balanceAmount = this.TotalAmount - this.collectionAmount  
}
collectAmount(){
  const user = localStorage.getItem('user')
  const userJson = JSON.parse(user!)
  const data:any =  {
    user_id:this.userId,
    collectedAmount:this.collectionAmount,
    collector:userJson.id
  }
  this.request.post('api/collectAmount',data,true).subscribe((res:any)=>{
    console.log(res)
    this.modalService.dismissAll()
    this.onDateChange()
  })
}
}
