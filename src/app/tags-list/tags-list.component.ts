import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from '../interfaces';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  private _notes: Note[] = [];
  @Output() selectTag: EventEmitter<string[]> = new EventEmitter();
  @Input() set notes(notes: Note[]) {
    this._notes = notes;
    this.tags = new Set();
    for (const note of notes) {
      if (note.tags) {
        for (const tag of note.tags) {
          this.tags.add(tag);
        }
      }
    }
  };
  get notes(): Note[] {
    return this._notes;
  }
  tags: Set<string> = new Set();
  private selectedTags: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleSelect(selectedTag: string): void {
    const selectedTagIndex = this.selectedTags.findIndex((tag: string) => {
      return tag === selectedTag;
    });
    if (selectedTagIndex > -1) {
      this.selectedTags.splice(selectedTagIndex, 1);
    } else {
      this.selectedTags.push(selectedTag);
    }
    this.selectTag.emit(this.selectedTags.slice());
  }
}
