import {
  AfterViewInit,
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LocationService } from '../../../../core/services/location.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { SelectComponent, SelectOption } from '../../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../../shared/components/textarea/textarea.component';

@Component({
  selector: 'app-report-component',
  standalone: true,
  templateUrl: './report-component.html',
  styleUrl: './report-component.scss',
  imports: [ButtonComponent, ReactiveFormsModule, InputComponent, SelectComponent, TextareaComponent],
})
export class ReportComponent implements AfterViewInit {
  public step: WritableSignal<number> = signal<number>(1);
  public reportForm!: FormGroup;

  public whatsHappeningOptions: WritableSignal<SelectOption[]> = signal<SelectOption[]>([
    { label: 'Maus-tratos físicos', value: 'MAUS_TRATOS' },
    { label: 'Abandono', value: 'ABANDONO' },
    { label: 'Animal preso/acorrentado', value: 'PRESO' },
    { label: 'Falta de comida/água', value: 'FOME' },
    { label: 'Outro', value: 'OUTRO' },
  ]);

  private map!: L.Map;
  private marker!: L.Marker;
  private leafletLib: any;
  private isProgrammaticUpdate = false;

  private fb: FormBuilder = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private locationService: LocationService = inject(LocationService);

  constructor() {
    this.buildForm();
  }

  // =========================
  // FORM
  // =========================
  private buildForm(): void {
    this.reportForm = this.fb.group({
      location: this.fb.group({
        address: ['', [Validators.minLength(5)]],
        latitude: [null],
        longitude: [null],
      }),

      occurrence: this.fb.group({
        type: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(10)]],
        media: this.fb.array([]),
      }),

      identification: this.fb.group({
        anonymous: [false],
        name: [''],
        email: [''],
        phone: [''],
      }),
    });

    this.handleAnonymousToggle();
  }

  private handleAnonymousToggle(): void {
    const idGroup = this.identificationForm;

    idGroup.get('anonymous')!.valueChanges.subscribe((isAnonymous) => {
      const name = idGroup.get('name');
      const email = idGroup.get('email');
      const phone = idGroup.get('phone');

      if (isAnonymous) {
        name?.clearValidators();
        email?.clearValidators();
        phone?.clearValidators();
      } else {
        name?.setValidators([Validators.required, Validators.minLength(3)]);
        email?.setValidators([Validators.required, Validators.email]);
        phone?.setValidators([
          Validators.required,
          Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/),
        ]);
      }

      name?.updateValueAndValidity();
      email?.updateValueAndValidity();
      phone?.updateValueAndValidity();
    });
  }

  // =========================
  // GETTERS
  // =========================
  get locationForm(): FormGroup {
    return this.reportForm.get('location') as FormGroup;
  }

  get occurrenceForm(): FormGroup {
    return this.reportForm.get('occurrence') as FormGroup;
  }

  get identificationForm(): FormGroup {
    return this.reportForm.get('identification') as FormGroup;
  }

  get mediaFiles(): FormArray {
    return this.occurrenceForm.get('media') as FormArray;
  }

  // =========================
  // MAPA
  // =========================
  async ngAfterViewInit(): Promise<void> {
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
      this.updateMarker(lat, lng, this.leafletLib);
    });

    // Geolocalização inicial
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          this.map.setView([lat, lng], 2);
          this.updateMarker(lat, lng, this.leafletLib);
        },
        (err) => console.warn('Erro ao obter localização', err),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      );
    }

    // 🔁 Endereço digitado → mapa
    this.locationForm
      .get('address')!
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(async (address: string) => {
        if (!address || address.length < 5) return;
        if (this.isProgrammaticUpdate) return;

        const coords = await this.locationService.geocodeAddress(address);
        if (!coords) return;

        this.isProgrammaticUpdate = true;

        this.locationForm.patchValue({
          latitude: coords.lat,
          longitude: coords.lng,
        });

        this.map.setView([coords.lat, coords.lng], 16);
        this.updateMarker(coords.lat, coords.lng, this.leafletLib);

        this.isProgrammaticUpdate = false;
      });
  }

  // =========================
  // UPLOAD
  // =========================
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => {
      this.mediaFiles.push(this.fb.control(file));
    });
  }

  // =========================
  // STEPS
  // =========================
  public changeStep(novoPasso: number): void {
    if (!this.isStepValid()) {
      this.markCurrentStepTouched();
      return;
    }

    this.step.set(novoPasso);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private isStepValid(): boolean {
    if (this.step() === 1) return this.locationForm.valid;
    if (this.step() === 2) return this.occurrenceForm.valid;
    if (this.step() === 3) return this.identificationForm.valid;
    return true;
  }

  private markCurrentStepTouched(): void {
    if (this.step() === 1) this.locationForm.markAllAsTouched();
    if (this.step() === 2) this.occurrenceForm.markAllAsTouched();
    if (this.step() === 3) this.identificationForm.markAllAsTouched();
  }

  public backStep(): void {
    if (this.step() > 1) {
      this.step.update((n) => n - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // =========================
  // SUBMIT
  // =========================
  public submitReport(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    const payload = this.reportForm.value;
    console.log('🚨 DENÚNCIA ENVIADA', payload);
    // 👉 enviar para API aqui
  }

  // =========================
  // MARKER / GEOCODE
  // =========================
  private async updateMarker(lat: number, lng: number, L: any): Promise<void> {
    this.locationForm.patchValue({
      latitude: lat,
      longitude: lng,
    });

    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = L.marker([lat, lng], { draggable: true })
        .addTo(this.map)
        .bindPopup('Local selecionado')
        .openPopup();

      this.marker.on('dragend', (event) => {
        const pos = event.target.getLatLng();
        this.updateMarker(pos.lat, pos.lng, L);
      });
    }

    // 🔁 Reverse geocoding
    if (this.isProgrammaticUpdate) return;

    this.isProgrammaticUpdate = true;

    const address = await this.locationService.reverseGeocode(lat, lng);
    if (address) this.locationForm.patchValue({ address });

    this.isProgrammaticUpdate = false;
  }
}
