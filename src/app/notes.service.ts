import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('/api/notes');
  }

  postNote(note: Note): Observable<Note[]> {
    return this.http.post<Note[]>('/api/edit-note', note);
  }

  addNote(): Observable<Note[]> {
    return this.http.post<Note[]>('/api/add-note', {});
  }

  deleteNote(noteId: string): Observable<Note[]> {
    return this.http.post<Note[]>('/api/delete-note', { id: noteId });
  }
}
