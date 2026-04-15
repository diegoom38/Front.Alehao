import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeToggleComponent } from '../../shared/components/dark-mode-toggle/dark-mode-toggle.component';

interface MenuItem {
  label: string;
  route: string;
  // Agora usamos apenas o nome do ícone do Material Symbols
  iconName: string;
}

@Component({
  selector: 'app-institutional',
  standalone: true,
  // Adicionado RouterLinkActive para destacar o item de menu ativo
  imports: [RouterOutlet, RouterLink, RouterLinkActive, DarkModeToggleComponent],
  templateUrl: './institutional.html',
  styleUrl: './institutional.scss',
})
export class Institutional {
  private readonly platformId = inject(PLATFORM_ID);

  // Signal para o estado do menu (colapsado ou não)
  public collapsed = signal(false);

  // Menu como Signal, usando nomes de ícones do Material Symbols
  public menu = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      route: 'dashboard',
      iconName: 'dashboard', // Nome do ícone no Material Symbols
    },
    {
      label: 'Voluntários',
      route: 'voluntarios',
      iconName: 'group', // Ícone de grupo de pessoas
    },
    {
      label: 'Casos',
      route: 'casos',
      iconName: 'folder_open', // Ícone de pasta aberta
    },
    {
      label: 'Suas adoções',
      route: 'suas-adocoes',
      iconName: 'favorite', // Ícone de favorito
    },
  ]);

  constructor() {
    this.initializeSidebar();
  }

  private initializeSidebar(): void {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('sidebar-collapsed');
      this.collapsed.set(saved === 'true');
    }
  }

  public toggle(): void {
    this.collapsed.update((state) => {
      const newState = !state;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('sidebar-collapsed', String(newState));
      }
      return newState;
    });
  }
}
