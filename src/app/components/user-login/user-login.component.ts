import { Token } from '@angular/compiler';
import { Component , EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  formGroup:any 
  errorMessage:any = false
  loginProcess:any = false
  @Output() loggedIn = new EventEmitter<boolean>();
  
  constructor(private formBuilder: FormBuilder ,private req :RequestService ,private route:Router) { }
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  login(){
    if(this.formGroup.valid){
      this.loginProcess = true
      this.req.post('api/login', this.formGroup.value, false).subscribe((res:any) => {
        localStorage.setItem('login','true')
        const token  =localStorage.getItem('token')
        localStorage.setItem('token',res.token)
        localStorage.setItem('email',this.formGroup.value.email)
        this.loggedIn.emit(true);
        this.route.navigate(['/dashboard'])
      }, (error:any) => {
        this.loginProcess = false
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
          setTimeout(() => {
            this.errorMessage = false;
          }, 2000);
        } else {
          this.errorMessage = error.message;
          setTimeout(() => {
            this.errorMessage = false;
          }, 2000);
        }
      });   
    } 
  }
}
