import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDetailsComponent } from './certificate-details.component';

describe('CertificateDetailsComponent', () => {
  let component: CertificateDetailsComponent;
  let fixture: ComponentFixture<CertificateDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateDetailsComponent]
    });
    fixture = TestBed.createComponent(CertificateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
