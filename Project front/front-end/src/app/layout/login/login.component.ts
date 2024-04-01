import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../infrastructure/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService:AuthService,private router:Router){}
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  LogIn() {
    const user: any = {
      username: this.userForm.value.username || '',

      password: this.userForm.value.password || '',
    };
    this.authService.login(user).subscribe( {
      next:(res)=>{
          console.log('successfull',res)
          this.router.navigate(['home'])
      },
      error:(err)=>{
        console.log('greska',err)
      }
      
     
     
    
    });


  }

}
