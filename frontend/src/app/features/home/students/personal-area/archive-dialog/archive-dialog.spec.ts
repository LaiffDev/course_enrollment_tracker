import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveDialog } from './archive-dialog';

describe('ArchiveDialog', () => {
  let component: ArchiveDialog;
  let fixture: ComponentFixture<ArchiveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
