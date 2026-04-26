import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-card-header',
  imports: [],
  templateUrl: './base-card-header.html',
  styleUrl: './base-card-header.scss',
})
export class BaseCardHeader {
  @Input() title: string = '';
}
