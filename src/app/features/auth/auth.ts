import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { RouterLink } from '@angular/router';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-auth',
  imports: [ButtonComponent, InputComponent, RouterLink, DarkModeToggleComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
