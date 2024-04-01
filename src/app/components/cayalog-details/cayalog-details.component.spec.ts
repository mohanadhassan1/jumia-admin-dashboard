import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CayalogDetailsComponent } from './cayalog-details.component';

describe('CayalogDetailsComponent', () => {
  let component: CayalogDetailsComponent;
  let fixture: ComponentFixture<CayalogDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CayalogDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CayalogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
