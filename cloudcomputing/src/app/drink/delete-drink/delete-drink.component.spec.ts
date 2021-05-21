import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDrinkComponent } from './delete-drink.component';

describe('DeleteDrinkComponent', () => {
  let component: DeleteDrinkComponent;
  let fixture: ComponentFixture<DeleteDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDrinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
