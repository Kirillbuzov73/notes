import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../interfaces';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  @Input() notes: Note[] = [];
  @Output() selectNote: EventEmitter<Note> = new EventEmitter();
  selectedNoteId?: string;

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((response: Note[]) => {
      this.notes = response.reverse();
    });
  }

  handleAdd(noteId?: string): void {
    this.notesService.addNote(noteId).subscribe((response: Note[]) => {
      this.notes = response.reverse();
    });
  }

  handleView(note: Note): void {
    this.selectedNoteId = note.noteId;
    this.selectNote.emit(note);
  }

  handleEdit(note: Note): void {
    this.notesService.postNote(note).subscribe((response: Note[]) => {
      this.notes = response.reverse();
    })
  }

  handleDelete(noteId: string): void {
    this.notesService.deleteNote(noteId).subscribe((response: Note[]) => {
      this.notes = response.reverse();
    })
  }
}
