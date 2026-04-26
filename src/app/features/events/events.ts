import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/components/header/header';
import { Footer } from '../../shared/components/footer/footer';

interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  organizer: string;
  image: string;
  summary: string;
  content: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    Header,
    Footer
  ],
  templateUrl: './events.html',
  styleUrls: ['./events.scss']
})
export class Events {

  categories = signal([
    'Todos',
    'Feira de Adoção',
    'Campanhas',
    'Palestras',
    'Ações Sociais'
  ]);

  currentFilter = signal('Todos');

  selectedEvent = signal<EventItem | null>(null);

  events = signal<EventItem[]>([
    {
      id: 1,
      title: 'Grande Feira de Adoção no Parque Central',
      category: 'Feira de Adoção',
      date: '12 de Maio de 2026',
      location: 'Parque Central',
      organizer: 'ONG Amigos dos Pets',
      image: 'assets/eventos/evento-1.jpg',
      summary: 'Diversos cães e gatos estarão esperando por uma nova família em mais uma grande feira de adoção responsável.',
      content: 'Este evento reúne protetores independentes, ONGs e voluntários dedicados à causa animal. Além da adoção responsável, haverá orientação veterinária gratuita, arrecadação de ração e ações educativas para conscientização sobre posse responsável.'
    },
    {
      id: 2,
      title: 'Campanha de Vacinação e Cuidados Preventivos',
      category: 'Campanhas',
      date: '20 de Maio de 2026',
      location: 'Praça da Cidade',
      organizer: 'Secretaria de Proteção Animal',
      image: 'assets/eventos/evento-2.jpg',
      summary: 'Uma ação gratuita com vacinação, orientações e prevenção de doenças para pets da comunidade.',
      content: 'A campanha busca facilitar o acesso à saúde preventiva para cães e gatos, oferecendo vacinação, triagem veterinária e orientações sobre alimentação, higiene e bem-estar animal.'
    },
    {
      id: 3,
      title: 'Palestra sobre Maus-Tratos e Denúncia Responsável',
      category: 'Palestras',
      date: '28 de Maio de 2026',
      location: 'Centro Comunitário',
      organizer: 'Instituto Proteção Animal',
      image: 'assets/eventos/evento-3.jpg',
      summary: 'Especialistas explicam como identificar maus-tratos e quais são os caminhos corretos para denúncia.',
      content: 'A palestra aborda legislação, canais de denúncia e a importância da conscientização coletiva para combater situações de abandono e violência contra animais.'
    },
    {
      id: 4,
      title: 'Mutirão Solidário de Arrecadação de Ração',
      category: 'Ações Sociais',
      date: '05 de Junho de 2026',
      location: 'Shopping Solidário',
      organizer: 'Projeto Patinhas Felizes',
      image: 'assets/eventos/evento-4.jpg',
      summary: 'Ajude abrigos e protetores independentes com doações de ração, medicamentos e itens essenciais.',
      content: 'O mutirão arrecada insumos para ajudar animais resgatados que aguardam adoção. Toda contribuição fortalece o trabalho das ONGs e protetores locais.'
    }
  ]);

  filteredEvents = computed(() => {
    const filter = this.currentFilter();

    if (filter === 'Todos') {
      return this.events();
    }

    return this.events().filter(
      event => event.category === filter
    );
  });

  setFilter(category: string): void {
    this.currentFilter.set(category);
  }

  openEvent(event: EventItem): void {
    this.selectedEvent.set(event);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  closeEvent(): void {
    this.selectedEvent.set(null);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}