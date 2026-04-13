import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ButtonComponent, InputComponent, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
