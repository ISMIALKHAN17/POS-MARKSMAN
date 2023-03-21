import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // public global_url:any = "https://pos.marksman.pk/public/";
  public global_url:any = "http://localhost/pos/public/";
  public Global_token:any = localStorage.getItem('token'); 
  // public global_url:any = "http://172.16.16.242/backend/public/";
    constructor(public http:HttpClient) { }
    post(url:any,data:any,token:any){
      if(token == true){
       console.log(this.Global_token);
      var headers:any = new HttpHeaders().set('Authorization', `Bearer ${this.Global_token}`);
      }
      return this.http.post(this.global_url+url,data,  { headers } );
    }
   
  
    get(url:any,token:any){
      if(token == true){
        console.log(this.Global_token);
       var headers:any = new HttpHeaders().set('Authorization', `Bearer ${this.Global_token}`);
       }
      return this.http.get(this.global_url+url,{ headers });

    }
  }
  
