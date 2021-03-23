import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-empty-note',
  templateUrl: './empty-note.component.html',
  styleUrls: ['./empty-note.component.scss']
})
export class EmptyNoteComponent implements OnInit {
  @Output() add: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addNote(): void {
    this.add.emit();
  }
}
