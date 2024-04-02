import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateByCaComponent } from './create-by-ca.component';

describe('CreateByCaComponent', () => {
  let component: CreateByCaComponent;
  let fixture: ComponentFixture<CreateByCaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateByCaComponent]
    });
    fixture = TestBed.createComponent(CreateByCaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
