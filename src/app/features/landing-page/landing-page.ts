import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  

}
