import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../interfaces';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {
  private _selectedTags: string[] = [];
  @Input() notes: Note[] = [];
  @Input() set selectedTags(selectedTags: string[]) {
    this._selectedTags = selectedTags;
    this.updateNotesList(this.notes);
  };
  get selectedTags(): string[] {
    return this._selectedTags;
  }
  @Output() selectNote: EventEmitter<Note> = new EventEmitter();
  @Output() updateNotes: EventEmitter<Note[]> = new EventEmitter();

  selectedNoteId?: string;
  notesToDisplay: Note[] = [];
  subscriptions: Subscription[] = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.notesService.getNotes().subscribe((response: Note[]) => {
      this.updateNotesList(response);
    }));
  }

  handleAdd(): void {
    this.subscriptions.push(this.notesService.addNote().subscribe((response: Note[]) => {
      this.updateNotesList(response);
    }));
  }

  handleView(note: Note): void {
    this.selectedNoteId = note.noteId;
    this.selectNote.emit(note);
  }

  handleEdit(note: Note): void {
    this.subscriptions.push(this.notesService.postNote(note).subscribe((response: Note[]) => {
      this.updateNotesList(response);
    }));
  }

  handleDelete(noteId: string): void {
    this.subscriptions.push(this.notesService.deleteNote(noteId).subscribe((response: Note[]) => {
      this.updateNotesList(response);
    }));
  }

  updateNotesList(notes: Note[]): void {
    this.updateNotes.emit(notes);
    this.notesToDisplay = notes.filter((note) => {
      if (!this.selectedTags.length) {
        return true;
      }
      if (note.tags) {
        for (let tag of this.selectedTags) {
          if (!note.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    }).reverse();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
