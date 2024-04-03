import { Component, OnInit } from '@angular/core';
import { CertificateServiceService } from '../certificate-service.service';
import { CertificateDB } from 'src/app/model/certificate.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { SelfSigned } from 'src/app/model/self-signed.model';
import { DataSource } from '@angular/cdk/collections';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectData } from 'src/app/model/subject-data.model';

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
  subjectData: SubjectData={
    endDate: new Date(),
    id: 0,
    startDate: new Date(),
    encodedkspassword: '',
    keyStore: '',
    serialNumber: '',
    subjectUsername: ''
  }

  existance: boolean= false
  decodedKeyStorePassword: string=''
  correctKeyStorePassword: string=''
  constructor(private service:CertificateServiceService,private authService: AuthService,private router:Router){}

  ngOnInit(): void {
    this.service.getUserById(this.authService.getUserId()).subscribe({
      next:(response)=>{
        this.loggedInUsername = response.username;
        this.service.checkForExistence('ROOT').subscribe({
          next:(response)=>{
            this.existance = response;
            if(!this.existance){
              //ako ne postoji nijedan root , kreiramo novi, sifra proizvoljna, to imam
            }else{
              this.checkKeyStorePassword() 
            }
          }
        })
      }
    })  
  }

  checkKeyStorePassword(){
    console.log("USAOO")
      this.service.getKSPassword('ROOT').subscribe({
        next:(response)=>{
          console.log('Enkodovana sa beka: '+ response)
          this.correctKeyStorePassword = response.toString();
        },error:(err)=>{
          console.log('greska',err)
        }
      })
      
  }
  appForm = new FormGroup({
    newKeyStorePassword: new FormControl('', [Validators.required]),
    newKeyStoreIssuerPassword: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })
  submitForm(){
    if(!this.existance){
      this.submit();
    }else{
      if(this.appForm.value.newKeyStorePassword != this.correctKeyStorePassword){
        alert('Password for key store is incorrect! Try again.')
        }
        else{
          this.submit();
        }
    }

   
  
    }
    
    
  submit(){
    if(this.appForm.value.newKeyStorePassword != null)
    this.certificate.newKeyStorePassword = this.appForm.value.newKeyStorePassword;

      this.certificate.username = this.loggedInUsername;
      if(this.appForm.value.startDate != null){
      this.certificate.startDate=new Date (this.appForm.value.startDate)
      }
      if(this.appForm.value.endDate != null){
        this.certificate.endDate=new Date (this.appForm.value.endDate)
        }
        if(this.appForm.value.newKeyStoreIssuerPassword != null)
      this.certificate.newKeyStoreIssuerPassword = this.appForm.value.newKeyStoreIssuerPassword;
      
      this.service.createRootSertificate(this.certificate).subscribe({
        next:(response)=>{
          this.router.navigate(['home']);
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
