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
    return this.http.get<Note[]>('http://localhost:3000/api/notes');
  }

  postNote(note: Note): Observable<Note[]> {
    return this.http.post<Note[]>('http://localhost:3000/api/edit-note', note);
  }

  addNote(): Observable<Note[]> {
    return this.http.post<Note[]>('http://localhost:3000/api/add-note', {});
  }

  deleteNote(noteId: string): Observable<Note[]> {
    return this.http.post<Note[]>('http://localhost:3000/api/delete-note', { id: noteId });
  }
}
