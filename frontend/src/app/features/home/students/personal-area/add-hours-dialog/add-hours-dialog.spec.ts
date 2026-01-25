import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoursDialog } from './add-hours-dialog';

describe('AddHoursDialog', () => {
  let component: AddHoursDialog;
  let fixture: ComponentFixture<AddHoursDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHoursDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHoursDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
