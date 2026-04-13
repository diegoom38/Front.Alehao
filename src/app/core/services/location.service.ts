// location.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocationService {
  async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.length) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }

  async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const res = await fetch(url);
    const data = await res.json();

    const buildAddress = (data: any): string => {
      return `${data.address?.road} - ${data.address?.suburb}, ${data.address?.city}, ${data.address?.postcode}`;
    }

    return buildAddress(data);
  }
}
