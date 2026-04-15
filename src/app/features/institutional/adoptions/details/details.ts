import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from '../../../../shared/components/base-card/base-card';

@Component({
  selector: 'app-details',
  imports: [ButtonComponent, BaseCard],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
}
