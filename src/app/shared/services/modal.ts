import { Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components/modal/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private vcr!: ViewContainerRef;

  setRootViewContainerRef(vcr: ViewContainerRef) {
    this.vcr = vcr;
  }

  openConfirm(data: { title: string; description: string; icon?: string }): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.vcr) {
        console.error('ModalService: vcr não configurado no AppComponent!');
        return resolve(false);
      }

      const componentRef = this.vcr.createComponent(ModalComponent);
      
      componentRef.setInput('title', data.title);
      componentRef.setInput('description', data.description);
      if (data.icon) componentRef.setInput('icon', data.icon);

      const subConfirm = componentRef.instance.onConfirm.subscribe(() => {
        componentRef.destroy();
        resolve(true);
      });

      const subCancel = componentRef.instance.onCancel.subscribe(() => {
        componentRef.destroy();
        resolve(false);
      });
    });
  }
}