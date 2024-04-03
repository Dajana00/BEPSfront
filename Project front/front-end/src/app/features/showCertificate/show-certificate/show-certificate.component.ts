import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CertificateDetailsComponent } from '../certificate-details/certificate-details.component';

@Component({
  selector: 'app-show-certificate',
  templateUrl: './show-certificate.component.html',
  styleUrls: ['./show-certificate.component.css']
})
export class ShowCertificateComponent {
  displayedColumns: string[] = ['SerialNumber', 'ValidFrom', 'ValidTo', 'symbol'];

  constructor(private dialog: MatDialog){


  }

  openDialog(){
    this.dialog.open(CertificateDetailsComponent,{
      width: '700px',
      height: '700px'
  });
  }
}
