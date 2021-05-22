import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDrinkDetailComponent } from './update-drink-detail.component';

describe('UpdateDrinkDetailComponent', () => {
  let component: UpdateDrinkDetailComponent;
  let fixture: ComponentFixture<UpdateDrinkDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDrinkDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDrinkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
