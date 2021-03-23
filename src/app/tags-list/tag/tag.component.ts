import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: string | undefined;
  @Output() select: EventEmitter<string> = new EventEmitter();

  isSelected = false;
  @HostBinding('style.background-color') get getBackgroundColor() {
    return this.isSelected ? 'purple' : '';
  }
  @HostBinding('style.color') get getColor() {
    return this.isSelected ? 'white' : '';
  }
  @HostListener('click') onClick() {
    this.isSelected = !this.isSelected;
    this.select.emit(this.tag);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
