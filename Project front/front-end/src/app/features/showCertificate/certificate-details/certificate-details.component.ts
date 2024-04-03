import { SubjectDto } from '../../../model/subject-dto.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.css']
})
export class CertificateDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    const subjectDto: SubjectDto = this.data.subjectDto;
  }
   subjectDto: SubjectDto =this.data.subjectDto;
  ngOnInit() {
    const subjectDto: SubjectDto = this.data.subjectDto;
    console.log(subjectDto); 
  }
}
