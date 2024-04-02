import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificate } from '../model/certificate.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SelfSigned } from '../model/self-signed.model';
import { CAEE } from '../model/caee.model';


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
}
