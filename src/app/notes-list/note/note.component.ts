import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/interfaces';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note | undefined;
  @Input() isPreview = false;
  @Input() isHighlighted = false;
  @Output() view: EventEmitter<Note> = new EventEmitter();
  @Output() edit: EventEmitter<Note> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Output() add: EventEmitter<string> = new EventEmitter();
  @HostBinding('style.width') get getWidth() {
    return this.isPreview ? '320px' : '150px';
  }
  @HostBinding('style.height') get getHeight() {
    return this.isPreview ? '320px' : '150px';
  }
  @HostBinding('style.box-shadow') get getBoxShadow() {
    return this.isHighlighted ? '0 0 10px #0377fc' : '';
  }
  isEditable = false;
  tags: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addNote(): void {
    this.add.emit();
  }

  onTitleChange(event: any): void {
    if (this.note) {
      this.note.title = event.target.textContent;
      this.edit.emit(this.note);
    }
  }

  viewNote(): void {
    this.view.emit(this.note);
  }

  editNote(isEditable: boolean): void {
    this.isEditable = isEditable;
  }

  deleteNote(): void {
    this.delete.emit(this.note?.noteId);
  }

  onTextChange(event: any): void {
    if (this.note) {
      let str = event.target.textContent;
      const tagsArray = str.split('#');
      this.note.tags = [];
      for (let i = 1; i < tagsArray.length; i++) {
        const tag = '#' + tagsArray[i]?.trim().split(' ')[0];
        this.note.tags?.push(tag);
      }
      this.note.text = event.target.textContent;
      this.edit.emit(this.note);
    }
  }
}
