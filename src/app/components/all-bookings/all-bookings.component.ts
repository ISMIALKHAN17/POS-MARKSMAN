import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { RequestService } from 'src/app/Services/request.service';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css'],
  providers: [DecimalPipe]
})
export class AllBookingsComponent {

  // Variables 
  searchForm:any
  responseData:any
  searchText:any = ''
  activity:any = 'Paintball'
  isData:any = true
  isLoading:any = false
  filteredData:any
  paginantion:any = []
  bookingsFound:any
  currentPage:any
  bookingsFrom:any
  bookingsTo:any
  detailsData:any= []
  // Variables 

constructor(public request:RequestService ,public modalService:NgbModal,public decimalPipe: DecimalPipe){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.searchBooking()
}
// Functions
searchBooking() {
  this.isLoading = true
  const data = {
    activity:this.activity
  } 
  this.request.post('api/search/game', data,true).subscribe(
    (response) => {
      this.isLoading = false
      this.responseData = response
      if(this.responseData.data.data.length == 0 ){
        this.isData = false 
      }else{
        this.isData = true
      }
      this.paginantionLoop(this.responseData.data.last_page)
      this.bookingsFound = this.responseData.data.total
      this.currentPage = this.responseData.data.current_page
      this.bookingsFrom = this.responseData.data.from
      this.bookingsTo = this.responseData.data.to
    },(error) => {
      console.error(error);
    }
  );
}
// Functions
onChangeActivity(value:any){
  this.isLoading = true
  this.activity = value.target.value
  const data = {
    activity:value.target.value
  }
  this.request.post('api/search/game', data,true).subscribe(
    (response) => {
      this.isLoading = false
      this.responseData = response

      if(this.responseData.data.data.length == 0 ){
        this.isData = false 
      }else{
        this.isData = true
      }
      this.paginantionLoop(this.responseData.data.last_page)
      this.bookingsFound = this.responseData.data.total
      this.currentPage = this.responseData.data.current_page
      this.bookingsFrom = this.responseData.data.from
      this.bookingsTo = this.responseData.data.to
    },(error) => {
      console.error(error);
    }
  );
}

paginantionLoop(pages:any){
  this.paginantion = []
  for(let i=1;i<=pages;i++){
   this.paginantion.push(i)
  }
}


paginantionData(pageNumber:any){
  this.isLoading = true
  const data = {
    activity:this.activity
  } 
  this.request.post(`api/search/game?page=${pageNumber}`,data,true).subscribe(res=>{
    this.responseData = res
    this.isLoading = false
    this.currentPage = this.responseData.data.current_page
    this.bookingsFrom = this.responseData.data.from
    this.bookingsTo = this.responseData.data.to
  })
}

search = (text$: Observable<string>) => {
  return text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map((term: string) => term.length < 2 ? [] : this.responseData.data.data.filter((item: { name: string; game_name: string; phone_no: any }) => {
      return item.name.toLowerCase().includes(term.toLowerCase()) || item.game_name.toLowerCase().includes(term.toLowerCase()) || item.phone_no.toString().includes(term);
    }))
  );
}

openBookingDetails(modal:any ,id:any){
  this.modalService.open(modal,{centered:true})
   this.detailsData = this.responseData.data.data.filter((item:any) => item.id === id);
}
}
