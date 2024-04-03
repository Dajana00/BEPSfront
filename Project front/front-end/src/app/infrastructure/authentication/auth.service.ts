import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private access_token = null;
  userClaims: any = null;
  

  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  public passChangeSource = new BehaviorSubject<boolean>(false);
  public passChangeObserver = this.passChangeSource.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.userClaims = this.jwtHelper.decodeToken();
    if (this.userClaims) this.loginSource.next(true);
  }

 

  login(loginRequest: Credential): Observable<boolean> {
    console.log('u servisu',loginRequest)
    return this.http
      .post<any>('http://localhost:8081/api/authentication/login', loginRequest)
      .pipe(
        map((res) => {
          console.log('Login success');
          console.log(res);
          localStorage.setItem('token', res.token);
          this.userClaims = this.jwtHelper.decodeToken();
          console.log('userclaims',this.userClaims)
          this.getUserId()
          this.getUsername()
          this.access_token = res.token;
          this.loginSource.next(true);
          return true;
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.loginSource.next(false);
  }

  isLogged(): boolean {
    if (!this.jwtHelper.tokenGetter()) return false;
    return true;
  }

  getUserRole(): string {
    return this.userClaims.role;
  }
  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  getUserId(): number {
    console.log('id',this.userClaims.id)
    return this.userClaims.id;
  }

  getUsername(): string {
    console.log("ooooo",this.userClaims.username);
    return this.userClaims.username;
    
  }

 
}
