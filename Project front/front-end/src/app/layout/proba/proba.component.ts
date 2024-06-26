import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';

@Component({
  selector: 'app-proba',
  templateUrl: './proba.component.html',
  styleUrls: ['./proba.component.css']
})
export class ProbaComponent implements OnInit{

  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.authService.loginN(3).subscribe({
      next:(res)=>{
        console.log('successfull',res)
    },
    error:(err)=>{
      console.log('greska',err)
    }
    })
  }



}
