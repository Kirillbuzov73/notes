import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteComponent } from './notes-list/note/note.component';
import { HttpClientModule } from '@angular/common/http';
import { HighlightPipe } from './highlight.pipe';
import { TagsListComponent } from './tags-list/tags-list.component';
import { EmptyNoteComponent } from './notes-list/empty-note/empty-note.component';
import { TagComponent } from './tags-list/tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteComponent,
    TagComponent,
    HighlightPipe,
    TagsListComponent,
    EmptyNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
