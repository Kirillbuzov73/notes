import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyNoteComponent } from './empty-note.component';

describe('EmptyNoteComponent', () => {
  let component: EmptyNoteComponent;
  let fixture: ComponentFixture<EmptyNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
