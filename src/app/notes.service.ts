import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Note } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private addEmptyNote: Note = {
    noteId: "0",
    title: "Title",
    text: "Write smth...",
    tags: [
      {
        tagId: '0',
        tagName: 'NONE',
      },
    ]
  }

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('http://localhost:3000/api/notes');
  }

  postNote(note: Note): Observable<Note[]> {
    return this.http.post<Note[]>('http://localhost:3000/api/edit-note', note);
  }

  addNote(noteId?: string): Observable<Note[]> {
    return this.http.post<Note[]>('http://localhost:3000/api/add-note', {
      id: noteId,
      emptyNote: this.addEmptyNote,
    });
  }

  deleteNote(noteId: string): Observable<Note[]> {
    return this.http.post<Note[]>('http://localhost:3000/api/delete-note', { id: noteId });
  }
}
