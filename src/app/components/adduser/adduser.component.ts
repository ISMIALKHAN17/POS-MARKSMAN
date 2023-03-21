import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  addUserForm:any
  submitted:any = false
  isLoading:any = false
  error:any = false

  
  constructor(private formBuilder: FormBuilder, private requst:RequestService,private router: Router) { }

  
  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', Validators.required],
      userType: ['', Validators.required]
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });
  }

  get f() { return this.addUserForm.controls; }
  
  onSubmit() {
    this.isLoading = true
    this.submitted = true;
    if (this.addUserForm.invalid) {
      this.isLoading = false
      return;
    }
    const data = {
      name: this.f.name.value,
      email: this.f.email.value,
      password: this.f.password.value,
      phoneNumber: this.f.phone.value,
      role: this.f.userType.value
    };
    console.log(data)
    this.requst.post('api/user/register', data,true)
      .subscribe(response => {
        this.error = false
        this.isLoading = false
        this.router.navigate(['/user'])
      },
      (error:any) => {
        if (error.status === 500) {
          this.isLoading = false
          this.error = true
        }
      });
  }

  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ matchPasswords: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }
}
