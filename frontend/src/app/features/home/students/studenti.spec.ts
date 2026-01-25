import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studenti } from './studenti';

describe('Studenti', () => {
  let component: Studenti;
  let fixture: ComponentFixture<Studenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studenti]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studenti);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
