import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CAEE } from 'src/app/model/caee.model';
import { CertificateServiceService } from '../certificate-service.service';
import { IssuerData } from 'src/app/model/issuer-data.model';
import { AuthService } from 'src/app/infrastructure/authentication/auth.service';
import { User } from 'src/app/model/user.model';
import {  CertificateDB } from 'src/app/model/certificate.model';
import { Router } from '@angular/router';
import { SubjectData } from 'src/app/model/subject-data.model';
import { max } from 'rxjs';

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
    newPKIssuerPassword: '',
    newKeyStorePassword: ''
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

  maxStartDate : string='';
  maxEndDate: string='';
  subjectData: SubjectData={
    endDate: new Date(),
    id: 0,
    startDate: new Date(),
    encodedkspassword: '',
    keyStore: '',
    serialNumber: '',
    subjectUsername: ''
  }
  existance: boolean=false;
  correctPassword :string='';
  icaKSPassword:string='';
  eeKSPassword:string='';


  constructor(private service:CertificateServiceService,private formBuilder: FormBuilder,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.inWhoseName = 'MyName';
    this.myGroup = this.formBuilder.group({
      inWhoseName: '',
      selectedIssuer: ''
    });
    this.service.getUserById(this.authService.getUserId()).subscribe({
      next:(response)=>{
        this.loggedUser = response;
        this.service.getAllCertificates().subscribe({
          next:(response)=>{
            this.issuers = response.filter(e=>e.issuerUsername !== this.loggedUser.username);
          }
        })
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
    newKeyStorePassword: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })

  submitForm(){
    
    this.arrangeData();


    if(this.certificateType == 'Intermediary'){
      this.service.checkForExistence('ICA').subscribe({
        next:(response)=>{
          if(response){
              //imamo ICA
              this.checkPasswordCorrectionForIntermediary('ICA');
          }else{
            this.createIntermediaryCertificate();
            alert('Successifuly created intermediary sertificate!');
          }
        }
      })
      
    }else{

      this.service.checkForExistence('EE').subscribe({
        next:(response)=>{
          if(response){
              //imamo EE
              this.checkPasswordCorrectionForEE('EE');
          }else{
            this.createEndEntityCertificate();
            alert('Successifuly created end entity sertificate!');
          }
        }
      })
      this.createEndEntityCertificate();
      alert('Successifuly created end entity sertificate!');

    }
    this.router.navigate(['home']);
  }

  checkPasswordCorrectionForIntermediary(type:string){
      this.service.getKSPassword('ICA').subscribe({
        next:(response)=>{
          this.icaKSPassword = response;
          if(this.icaKSPassword != this.appForm.value.newKeyStorePassword){
            alert('Password for key store is incorrect!');
          }else{
            this.createIntermediaryCertificate();
            alert('Successifuly created intermediary sertificate!');
          }
        }
      })
      
  }
  checkPasswordCorrectionForEE(type:string){
    this.service.getKSPassword('EE').subscribe({
      next:(response)=>{
        this.icaKSPassword = response;
        if(this.icaKSPassword != this.appForm.value.newKeyStorePassword){
          alert('Password for key store is incorrect!');
        }else{
          this.createEndEntityCertificate();
          alert('Successifuly created end entity sertificate!');
        }
      }
    })
    
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

  getSubjectDataForValidating(){
    this.service.getSubjectDataByUsername(this.issuerUsername).subscribe({
      next:(response)=>{
        this.subjectData = response;
        this.validateDates();
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

    if(this.appForm.value.newKeyStorePassword != null)
    this.certificate.newKeyStorePassword = this.appForm.value.newKeyStorePassword;

    if(this.appForm.value.startDate != null){
    this.certificate.startDate=new Date (this.appForm.value.startDate)
    }
    if(this.appForm.value.endDate != null){
      this.certificate.endDate=new Date (this.appForm.value.endDate)
    }
  }
  onIssuerChange(event:any): void {
    this.issuerUsername = event.target.value;
    this.selectedIssuerUsername = event.target.value
    console.log("Novi issuer: ",this.selectedIssuerUsername);
    this.getSubjectDataForValidating();
  }

  onChange(): void {

    if(this.appForm.value.inWhoseName )
    this.inWhoseName = this.appForm.value.inWhoseName;
    if(this.inWhoseName=='MyName'){
      this.issuerUsername = this.loggedUser.username;
    }else{
    }
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

  validateDates(){
    console.log('Start root: ', new Date(this.subjectData.startDate).toLocaleString());
    console.log('End root: ', new Date(this.subjectData.endDate).toLocaleString());

    const startDateValue = this.subjectData.startDate;
    const maxStartDateValue = this.subjectData.endDate;
    const maxEndDateValue = this.subjectData.endDate;
    if (startDateValue !== null && startDateValue !== undefined) {
      const startDate = new Date(startDateValue);

      const minStartDate = new Date(startDateValue)
      const maxStartDate = new Date(maxStartDateValue);
      const maxEndDate = new Date(maxStartDateValue);
      const minEndDate = new Date(minStartDate);

      minStartDate.setDate(minStartDate.getDate() + 1); 
      this.minStartDate = minStartDate.toISOString().split('T')[0];

      maxStartDate.setDate(maxStartDate.getDate() - 2); 
      this.maxStartDate = maxStartDate.toISOString().split('T')[0];

      minEndDate.setDate(minStartDate.getDate() + 1); 
      this.minEndDate = minEndDate.toISOString().split('T')[0];

      maxEndDate.setDate(maxStartDate.getDate() + 1); 
      this.maxEndDate = maxEndDate.toISOString().split('T')[0];
    } else {
    }
  }
}
