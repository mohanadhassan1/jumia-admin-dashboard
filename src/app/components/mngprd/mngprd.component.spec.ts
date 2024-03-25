import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MngprdComponent } from './mngprd.component';

describe('MngprdComponent', () => {
  let component: MngprdComponent;
  let fixture: ComponentFixture<MngprdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MngprdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MngprdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
