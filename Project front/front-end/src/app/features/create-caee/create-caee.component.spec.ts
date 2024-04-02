import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCAEEComponent } from './create-caee.component';

describe('CreateCAEEComponent', () => {
  let component: CreateCAEEComponent;
  let fixture: ComponentFixture<CreateCAEEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCAEEComponent]
    });
    fixture = TestBed.createComponent(CreateCAEEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
