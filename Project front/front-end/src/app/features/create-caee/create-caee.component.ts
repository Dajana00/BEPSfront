import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CAEE } from 'src/app/model/caee.model';
import { CertificateServiceService } from '../certificate-service.service';

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
    endDate: new Date()
  }
  constructor(private service:CertificateServiceService){}
  ngOnInit(): void {
  }

  appForm = new FormGroup({
    subjectUsername: new FormControl('', [Validators.required]),
    subjectOrganization: new FormControl('', [Validators.required]),
    subjectOrganizationUnit: new FormControl('', [Validators.required]),
    subjectCountry: new FormControl('', [Validators.required]),
    subjectEmail: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })
  submitForm(){
    this.certificate.issuerUsername = 'daks'; //popraviitiiii
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

    if(this.appForm.value.startDate != null){
    this.certificate.startDate=new Date (this.appForm.value.startDate)
    }
    if(this.appForm.value.endDate != null){
      this.certificate.endDate=new Date (this.appForm.value.endDate)
      }
      
    this.service.createCAEESertificate(this.certificate).subscribe({
      next:(response)=>{
        
      },
      error:(err)=>{
        console.log('greska',err)
      }
    })
  }

}
