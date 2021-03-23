import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from './interfaces';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  updatedNotes: Note[] = [];
  title = 'notes';
  selectedNote?: Note;
  selectedTags: string[] = [];
  subscriptions: Subscription[] = [];

  constructor(private notesService: NotesService) { }

  handleView(note: Note): void {
    this.selectedNote = note;
  }

  handleEdit(note: Note): void {
    this.subscriptions.push(this.notesService.postNote(note).subscribe((response: Note[]) => {
      this.updatedNotes = response.reverse();
    }));
  }

  handleDelete(noteId: string): void {
    this.selectedNote = undefined;
    this.subscriptions.push(this.notesService.deleteNote(noteId).subscribe((response: Note[]) => {
      this.updatedNotes = response.reverse();
    }));
  }

  handleUpdateNotes(notes: Note[]): void {
    this.updatedNotes = notes;
  }

  handleSelectTag(selectedTags: string[]): void {
    this.selectedTags = selectedTags;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
