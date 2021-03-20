import { Component } from '@angular/core';
import { Note } from './interfaces';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  updatedNotes: Note[] = [];
  title = 'notes';
  selectedNote?: Note;

  constructor(private notesService: NotesService) { }

  handleView(note: Note): void {
    this.selectedNote = note;
  }

  handleEdit(note: Note): void {
    this.notesService.postNote(note).subscribe((response: Note[]) => {
      this.updatedNotes = response.reverse();
    });
  }

  handleDelete(noteId: string): void {
    this.selectedNote = undefined;
    this.notesService.deleteNote(noteId).subscribe((response: Note[]) => {
      this.updatedNotes = response.reverse();
    });
  }
}
