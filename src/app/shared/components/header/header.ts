import { Component } from '@angular/core';
import { DarkModeToggleComponent } from "../dark-mode-toggle/dark-mode-toggle.component";
import { ButtonComponent } from "../button/button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DarkModeToggleComponent, ButtonComponent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Opcional: Bloquear o scroll do corpo quando o menu estiver aberto
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }
}
