import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BaseCardHeader } from "../base-card-header/base-card-header";

@Component({
  selector: 'app-base-card',
  standalone: true,
  imports: [NgClass, BaseCardHeader],
  templateUrl: './base-card.html'
})
export class BaseCard {
  @Input() hover = true;
  @Input() padding = true;
  @Input() header: string = '';
  @Input() borderColor: string = 'border-gray-200';
}