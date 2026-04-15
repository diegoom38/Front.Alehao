import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonComponent, RouterLink, DarkModeToggleComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  

}
