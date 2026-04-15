import { TestBed } from '@angular/core/testing';
import { ModalComponent } from '../components/modal/modal';


describe('Modal', () => {
  let service: ModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
