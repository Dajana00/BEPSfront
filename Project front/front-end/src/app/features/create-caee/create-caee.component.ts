import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CAEE } from 'src/app/model/caee.model';
import { CertificateServiceService } from '../certificate-service.service';
import { IssuerData } from 'src/app/model/issuer-data.model';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { User } from 'src/app/model/user.model';
import {  CertificateDB } from 'src/app/model/certificate.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-caee',
  templateUrl: './create-caee.component.html',
  styleUrls: ['./create-caee.component.css']
})
export class CreateCAEEComponent implements OnInit{

  certificate:CAEE={
    issuerUsername: '',
    subjectUsername: '',
    subjectOrganization: '',
    subjectOrganizationUnit: '',
    subjectCountry: '',
    subjectEmail: '',
    startDate: new Date(),
    endDate: new Date(),
    newPKIssuerPassword: ''
  }
  inWhoseName:string ='';
  selectedIssuerUsername : string = ''
  loggedUser: User = {
    id: 0,
    password: '',
    username: '',
    email: '',
    role: ''
  }
  myGroup!: FormGroup;
  loggedUserId: number=0;
  issuers:CertificateDB[]=[]
  certificateType:string='';
  issuerUsername:string = ''
  minEndDate: string ='';
  minStartDate: string = '';

  constructor(private service:CertificateServiceService,private formBuilder: FormBuilder,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.inWhoseName = 'MyName';
    this.myGroup = this.formBuilder.group({
      inWhoseName: '',
      selectedIssuer: ''
    });
    //this.loggedUserId = this.authService.getUserId();
    this.service.getUserById(this.authService.getUserId()).subscribe({
      next:(response)=>{
        this.loggedUser = response;
      }
    })
    this.service.getAllCertificates().subscribe({
      next:(response)=>{
        this.issuers = response;
      }
    })
    
 
  }

  appForm = new FormGroup({
    inWhoseName: new FormControl('', [Validators.required]),
    certificateType: new FormControl('', [Validators.required]),
    subjectUsername: new FormControl('', [Validators.required]),
    subjectOrganization: new FormControl('', [Validators.required]),
    subjectOrganizationUnit: new FormControl('', [Validators.required]),
    subjectCountry: new FormControl('', [Validators.required]),
    subjectEmail: new FormControl('', [Validators.required]),
    newPKIssuerPassword: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })

  submitForm(){
    
    this.arrangeData();

    if(this.certificateType == 'Intermediary'){
      this.createIntermediaryCertificate();
      alert('Successifuly created intermediary sertificate!');
    }else{
      this.createEndEntityCertificate();
      alert('Successifuly created end entity sertificate!');

    }
    this.router.navigate(['home']);
  }


  createIntermediaryCertificate(){
    this.service.createCAEESertificate(this.certificate).subscribe({
      next:(response)=>{
      },
      error:(err)=>{
        console.log('greska',err)
      }
    })
  }
  createEndEntityCertificate(){
    this.service.createEECertificate(this.certificate).subscribe({
      next:(response)=>{
      },
      error:(err)=>{
        console.log('greska',err)
      }
    })
  }
  arrangeData(){
    if(this.inWhoseName == 'MyName'){
      console.log("U cije ime radimo: ",this.inWhoseName);
      this.certificate.issuerUsername = this.loggedUser.username; 
    }else{
      this.certificate.issuerUsername = this.selectedIssuerUsername;
    }
    
    if(this.appForm.value.subjectUsername != null)
    this.certificate.subjectUsername = this.appForm.value.subjectUsername;

    if(this.appForm.value.subjectOrganization != null)
    this.certificate.subjectOrganization = this.appForm.value.subjectOrganization;

    if(this.appForm.value.subjectOrganizationUnit != null)
    this.certificate.subjectOrganizationUnit = this.appForm.value.subjectOrganizationUnit;

    if(this.appForm.value.subjectCountry != null)
    this.certificate.subjectCountry = this.appForm.value.subjectCountry;

    if(this.appForm.value.subjectEmail != null)
    this.certificate.subjectEmail = this.appForm.value.subjectEmail;

    if(this.appForm.value.newPKIssuerPassword != null)
    this.certificate.newPKIssuerPassword = this.appForm.value.newPKIssuerPassword;

    if(this.appForm.value.startDate != null){
    this.certificate.startDate=new Date (this.appForm.value.startDate)
    }
    if(this.appForm.value.endDate != null){
      this.certificate.endDate=new Date (this.appForm.value.endDate)
    }
  }
  onIssuerChange(event:any): void {
    this.selectedIssuerUsername = event.target.value
    console.log("Novi issuer: ",this.selectedIssuerUsername);
  }

  onChange(): void {

    if(this.appForm.value.inWhoseName )
    this.inWhoseName = this.appForm.value.inWhoseName;
    console.log(this.inWhoseName);
  }

  onChangeCertificateType():void{
    if(this.appForm.value.certificateType)
    this.certificateType = this.appForm.value.certificateType;
    console.log(this.certificateType);
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
    }
  }
}
