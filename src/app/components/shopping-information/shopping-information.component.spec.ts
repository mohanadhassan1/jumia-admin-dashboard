import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingInformationComponent } from './shopping-information.component';

describe('ShoppingInformationComponent', () => {
  let component: ShoppingInformationComponent;
  let fixture: ComponentFixture<ShoppingInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
