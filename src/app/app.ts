import { Component, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './shared/services/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Front.Alehao');
  private vcr = inject(ViewContainerRef);
  private modalService = inject(ModalService);

  ngOnInit() {
    this.modalService.setRootViewContainerRef(this.vcr);
  }
}
