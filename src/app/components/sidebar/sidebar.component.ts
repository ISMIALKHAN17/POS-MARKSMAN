import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  local:any = localStorage.getItem('user');
  me:any = JSON.parse(this.local); 
  ngOnInit(){
 
    
   
  
  }

  
}
 
