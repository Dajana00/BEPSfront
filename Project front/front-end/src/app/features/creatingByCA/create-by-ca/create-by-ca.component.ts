import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CAEE } from 'src/app/model/caee.model';
import { IssuerData } from 'src/app/model/issuer-data.model';
import { User } from 'src/app/model/user.model';
import { CertificateServiceService } from '../../certificate-service.service';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';

@Component({
  selector: 'app-create-by-ca',
  templateUrl: './create-by-ca.component.html',
  styleUrls: ['./create-by-ca.component.css']
})
export class CreateByCaComponent {


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
  loggedUser: User = {
    id: 0,
    password: '',
    username: '',
    email: '',
    role: ''
  }
  myGroup!: FormGroup;
  loggedUserId: number=0;
  certificateType:string='';
  issuerUsername:string = ''
  minEndDate: string ='';
  minStartDate: string = '';

  constructor(private service:CertificateServiceService,private formBuilder: FormBuilder,private authService:AuthService){}
  ngOnInit(): void {
    
    this.service.getUserById(this.authService.getUserId()).subscribe({
      next:(response)=>{
        this.loggedUser = response;
      }
    })

  }

  appForm = new FormGroup({
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

    if(this.certificateType== 'Intermediary'){
      this.createIntermediaryCertificate();
    }else{
      this.createEndEntityCertificate();
    }
    
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

    this.certificate.issuerUsername = this.loggedUser.username; 
   
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
        // Handle the case where startDate is null or undefined
    }
  }
}
