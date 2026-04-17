import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from "../../shared/components/header/header";
import { Footer } from "../../shared/components/footer/footer";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  size: string;
  trait: string;
  img: string;
  history: string;
}

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './adopt.html'
})
export class Adopt {

  pets = signal<Pet[]>([
    {
      id: 1,
      name: "Apolo",
      species: "Cão",
      breed: "Vira-lata",
      age: "2 anos",
      size: "Grande",
      trait: "Brincalhão",
      img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600",
      history: "Resgatado de um local de obras, é pura energia e amor."
    },
    {
      id: 2,
      name: "Luna",
      species: "Gato",
      breed: "Siamês",
      age: "6 meses",
      size: "Pequeno",
      trait: "Carinhosa",
      img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
      history: "Ama colo e tranquilidade."
    }
  ]);

  currentFilter = signal<string>('Todos');
  selectedPet = signal<Pet | null>(null);

  species = computed(() => {
    const list = this.pets().map(p => p.species);
    return ['Todos', ...new Set(list)];
  });

  filteredPets = computed(() => {
    if (this.currentFilter() === 'Todos') return this.pets();
    return this.pets().filter(p => p.species === this.currentFilter());
  });

  setFilter(filter: string) {
    this.currentFilter.set(filter);
  }

  openPet(pet: Pet) {
    this.selectedPet.set(pet);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closePet() {
    this.selectedPet.set(null);
  }
}