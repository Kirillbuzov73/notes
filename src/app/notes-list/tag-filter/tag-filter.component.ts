import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.scss']
})
export class TagFilterComponent implements OnInit {
  @Input() tag: Tag | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
