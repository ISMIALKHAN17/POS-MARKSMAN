import { Component } from '@angular/core';
import { RequestService } from './Services/request.service';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'marksman-admin-panel';
  login:any = false
  constructor(public req:RequestService){}
  ngOnInit(): void {
    const isLogin = localStorage.getItem('login'); 
    const email = localStorage.getItem('email'); 
    this.login = isLogin
    this.me(email)
  }
  me(email:any){
    this.req.post('api/user/me', {"email":email},true).subscribe((res:any) => {
      let me = JSON.stringify(res);
      localStorage.setItem('user',me)

    });
  }
  onLoggedIn(value: boolean) {
    this.login = value;
    if (this.login) {
      window.location.reload()
    }
  }
  
}
