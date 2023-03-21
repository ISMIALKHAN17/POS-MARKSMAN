import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
users:any = []
isLoading:any = false
userRole:any
 
  constructor(public request:RequestService , private route:Router){}

  ngOnInit(): void {
  const user:any =   localStorage.getItem('user')
  const userJson = JSON.parse(user!)
  this.userRole = userJson.role
  if(this.userRole != 'Admin'){
    this.route.navigate([''])
  }
    this.request.post('api/user/detail',{email:userJson.email},true).subscribe((res:any)=>{
      this.users =  res
      this.isLoading = true
    })
  }
}
