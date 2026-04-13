import { Component, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Tag } from "../../../shared/components/tag/tag";

// Tipagem baseada no seu modelo de dados
interface Report {
  id: string;
  type: string;
  status: 'NOVO' | 'EM_ANALISE' | 'EM_ATENDIMENTO' | 'RESOLVIDO';
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  address: string;
  createdAt: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, Tag],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private map!: L.Map;
  private marker!: L.Marker;
  private leafletLib: any;

  private fb: FormBuilder = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  // Signals para reatividade de alta performance (Angular 20 style)
  reports = signal<Report[]>([
    {
      id: '1',
      type: 'Maus-tratos',
      status: 'NOVO',
      priority: 'ALTA',
      address: 'Rua das Flores, 123',
      createdAt: '2024-05-20T10:00:00',
    },
    {
      id: '2',
      type: 'Abandono',
      status: 'EM_ATENDIMENTO',
      priority: 'MEDIA',
      address: 'Av. Central, 500',
      createdAt: '2024-05-20T09:30:00',
    },
    {
      id: '3',
      type: 'Fome/Sede',
      status: 'RESOLVIDO',
      priority: 'BAIXA',
      address: 'Praça da Matriz, S/N',
      createdAt: '2024-05-19T15:00:00',
    },
    {
      id: '4',
      type: 'Preso/Corrente',
      status: 'NOVO',
      priority: 'ALTA',
      address: 'Rua B, 45',
      createdAt: '2024-05-20T11:20:00',
    },
  ]);

  // Computed signals para os KPIs
  totalOpen = computed(() => this.reports().filter((r) => r.status !== 'RESOLVIDO').length);
  
  criticalToday = computed(
    () => this.reports().filter((r) => r.priority === 'ALTA' && r.status === 'NOVO').length,
  );

  resolvedCount = computed(() => this.reports().filter((r) => r.status === 'RESOLVIDO').length);

  public async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const L = await import('leaflet');
    this.leafletLib = L;

    this.map = L.map('map', {
      center: [-15.7801, -47.9292],
      zoom: 12,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    }).addTo(this.map);

    // Clique no mapa
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
    });

    // Geolocalização inicial
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          this.map.setView([lat, lng], 2);
        },
        (err) => console.warn('Erro ao obter localização', err),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }
  }
}
