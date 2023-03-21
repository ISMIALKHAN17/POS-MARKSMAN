import { Component } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  toogle_menu(){
    // $('.sidebar, .content').toggleClass("open")
  }
  local:any = localStorage.getItem('user');
  me:any = JSON.parse(this.local); 

  logout(){
    localStorage.removeItem('login')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload()
    console.log(0)
  }
 
}
