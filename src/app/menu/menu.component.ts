import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../interfaces';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() delete: EventEmitter<string> = new EventEmitter();
  @Input() note?: Note;
  isEditable = false;
  isViewClicked = true;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {

  }

  onTitleChange(event: any): void {
    if (this.note) {
      this.note.title = event.target.textContent;
      // this.handleEdit(this.note);
    }
  }

  onTextChange(event: any): void {
    if (this.note) {
      this.note.text = event.target.textContent;
      // this.handleEdit(this.note);
    }
  }

  // handleEdit(note: Note): void {
  //   this.notesService.postNote(note).subscribe((response: Note[]) => {
  //     for (let i = 0; i < response.length; i++) {
  //       if (note.noteId === response[i].noteId) {
  //         this.note = response[i];
  //       }
  //     }
  //   })
  // }

  editNote(isEditable: boolean): void {
    console.log(isEditable);
    this.isEditable = isEditable;
  }

  deleteNote(): void {
    // this.delete.emit(this.note?.noteId);
  }
}
