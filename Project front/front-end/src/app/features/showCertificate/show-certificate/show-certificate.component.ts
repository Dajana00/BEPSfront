import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CertificateDetailsComponent } from '../certificate-details/certificate-details.component';
import { SubjectDto } from '../../../model/subject-dto.model';
import { CertificateServiceService } from '../../certificate-service.service';
import { AuthService } from '../../../infrastructure/authentication/auth.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-show-certificate',
  templateUrl: './show-certificate.component.html',
  styleUrls: ['./show-certificate.component.css']
})
export class ShowCertificateComponent {
  displayedColumns: string[] = ['SerialNumber', 'ValidFrom', 'ValidTo',"SubjectUsername" ,'symbol'];
  subjects: SubjectDto[]=[]
  loggedInUsername: String
  loggedInRole: String
  constructor(private dialog: MatDialog,private service: CertificateServiceService, private authService: AuthService){
    this.loggedInRole=this.authService.getUserRole();
    console.log('role',this.loggedInRole)
    if(this.loggedInRole=="ADMIN"){
      
      this.getAllSubjectByAdmin();
    }
    if(this.loggedInRole=="ICA"){
      this.getAllSubjectByICA();
    }
    if(this.loggedInRole=="ENDENTITY"){
      this.getAllSubjectByEE();
    }
   
    this.loggedInUsername=this.authService.getUsername()
  }

  openDialog(subjectDto:SubjectDto){
    this.dialog.open(CertificateDetailsComponent,{
      width: '700px',
      height: '700px',
      data: { subjectDto: subjectDto } 
  });
  }

  getAllSubjectByAdmin(){
    this.loggedInUsername=this.authService.getUsername()
    console.log('USERNAME',this.loggedInUsername)
    this.service.getAllCertificatesByAdmin(this.loggedInUsername).subscribe({
      next:(res:SubjectDto[])=>{
        console.log('uspjeo',res)
        this.subjects=res
      },
      error:(err:String)=>{
        console.log('greska',err)
        
      }
    });

  }

  getAllSubjectByICA(){
    this.loggedInUsername=this.authService.getUsername()
    console.log('USERNAME',this.loggedInUsername)
    this.service.getAllCertificatesByICA(this.loggedInUsername).subscribe({
      next:(res:SubjectDto[])=>{
        console.log('uspjeo',res)
        this.subjects=res
      },
      error:(err:String)=>{
        console.log('greska',err)
        
      }
    });

  }

  getAllSubjectByEE(){
    this.loggedInUsername=this.authService.getUsername()
    console.log('USERNAME',this.loggedInUsername)
    this.service.getAllCertificatesByEE(this.loggedInUsername).subscribe({
      next:(res:SubjectDto[])=>{
        console.log('uspjeo',res)
        this.subjects.length=0
        this.subjects=res;
        console.log('subjects',this.subjects)
      },
      error:(err:String)=>{
        console.log('greska',err)
        
      }
    });

  }

  
}
