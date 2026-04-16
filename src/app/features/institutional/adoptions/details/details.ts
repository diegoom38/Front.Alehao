import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BaseCard } from '../../../../shared/components/base-card/base-card';
import { ToggleSwitchComponent } from "../../../../shared/components/toggle/toggle";
import { RichText } from "../../../../shared/components/rich-text/rich-text";

@Component({
  selector: 'app-details',
  imports: [ButtonComponent, BaseCard, ToggleSwitchComponent, RichText],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
}
