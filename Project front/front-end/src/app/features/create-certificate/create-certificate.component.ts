import { Component, OnInit } from '@angular/core';
import { CertificateServiceService } from '../certificate-service.service';
import { Certificate } from 'src/app/model/certificate.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { SelfSigned } from 'src/app/model/self-signed.model';
import { DataSource } from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-certificate',
  templateUrl: './create-certificate.component.html',
  styleUrls: ['./create-certificate.component.css']
})
export class CreateCertificateComponent implements OnInit {


  certificate:SelfSigned ={
    username: '',    
    newKeyStorePassword: '',
    newKeyStoreIssuerPassword: '',
    startDate: new Date,
    endDate: new Date,
  
  }
  minEndDate: string ='';
  minStartDate: string = '';
  loggedInUsername!: string;

  constructor(private service:CertificateServiceService,private authService: AuthService){}

  ngOnInit(): void {
    this.service.getUserById(this.authService.getUserId()).subscribe({
      next:(response)=>{
        this.loggedInUsername = response.username;
      }
    })  }

  appForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })
  submitForm(){

    this.certificate.username = this.loggedInUsername;
    if(this.appForm.value.startDate != null){
    this.certificate.startDate=new Date (this.appForm.value.startDate)
    }
    if(this.appForm.value.endDate != null){
      this.certificate.endDate=new Date (this.appForm.value.endDate)
      }
      if(this.appForm.value.password != null)
    this.certificate.newKeyStoreIssuerPassword = this.appForm.value.password;
    if(this.appForm.value.password2 != null)
    this.certificate.newKeyStorePassword = this.appForm.value.password2;
    this.service.createRootSertificate(this.certificate).subscribe({
      next:(response)=>{
        
      },
      error:(err)=>{
        console.log('greska',err)
      }
    })
  }
 
  onChangeStartDate(): void {
    const startDateValue = this.appForm.value.startDate;
    if (startDateValue !== null && startDateValue !== undefined) {
      const startDate = new Date(startDateValue);
      // Sada možete koristiti startDate kao Date objekat
      const minEndDate = new Date(startDate);
      minEndDate.setDate(minEndDate.getDate() + 1); // Postavljamo minimalni End Date na sledeći dan od Start Date-a
      this.minEndDate = minEndDate.toISOString().split('T')[0];
    } else {
        // Handle the case where startDate is null or undefined
    }
  }
}
