import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLogged : boolean=false
  constructor(
    private router: Router,
    private authService: AuthService 
  ) {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      
      if (this.isLogged) {
        
      }
    });

    
  }
  ngOnInit(): void {
    this.authService.loginObserver.subscribe((val) => {
      this.isLogged = val;
      
     
    });

    
  }
}
