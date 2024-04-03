import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CertificateDB } from '../model/certificate.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SelfSigned } from '../model/self-signed.model';
import { CAEE } from '../model/caee.model';
import { User } from '../model/user.model';

import { SubjectData } from '../model/subject-data.model';

import { SubjectDto } from '../model/subject-dto.model';



@Injectable({
  providedIn: 'root'
})
export class CertificateServiceService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { 
  }

  createRootSertificate(certificate:SelfSigned): Observable<void> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log(certificate)
    return this.http.post<void>('http://localhost:8081/api/certificates/issue-root',certificate,{headers});
  }


  createCAEESertificate(certificate:CAEE): Observable<void> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log(certificate)
    return this.http.post<void>('http://localhost:8081/api/certificates/issue-ica',certificate,{headers});
  }

  
  createEECertificate(certificate:CAEE): Observable<void> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log(certificate)
    return this.http.post<void>('http://localhost:8081/api/certificates/issue-ee',certificate,{headers});
  }

  getUserById(id:number): Observable<User> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("ID: ",id)
    return this.http.get<User>('http://localhost:8081/api/users/getById/' +id,{headers});
  }

  getAllCertificates(): Observable<CertificateDB[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<CertificateDB[]>('http://localhost:8081/api/certificates/getAllCertificates' ,{headers});
  }


  getSubjectDataByUsername(username:string): Observable<SubjectData> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("Proslijedjen username: ",username);
    return this.http.get<SubjectData>('http://localhost:8081/api/certificates/getSubjectDataByUsername/'+ username ,{headers});
  }

   getAllCertificatesByAdmin(username:String): Observable<SubjectDto[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<SubjectDto[]>('http://localhost:8081/api/certificates/getForAdmin' + '/'+ username,{headers});
  }
  getAllCertificatesByICA(username:String): Observable<SubjectDto[]> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<SubjectDto[]>('http://localhost:8081/api/certificates/getForICA' + '/'+ username,{headers});
  }

  getAllCertificatesByEE(username:String): Observable<SubjectDto> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    return this.http.get<SubjectDto>('http://localhost:8081/api/certificates/getForEE' + '/'+ username,{headers});
  }
  
  
  getNumberOfCertificatesByType(type:string): Observable<SubjectData> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("Proslijedjen type: ",type);
    return this.http.get<SubjectData>('http://localhost:8081/api/certificates/getNumberOfCertificatesByType/'+ type ,{headers});
  }

  getKSPassword(type:string): Observable<any> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("Proslijedjen type: ",type);
    return this.http.get<any>('http://localhost:8081/api/certificates/getKSPasswordByType/'+ type ,{headers});
  }

  
  checkForExistence(type:string): Observable<boolean> {
    const token = this.jwtHelper.tokenGetter();
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("Proslijedjen type: ",type);
    return this.http.get<boolean>('http://localhost:8081/api/certificates/checkExistence/'+ type ,{headers});
  }
  
  
}
