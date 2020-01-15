import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalActualizarImagenPage } from './modal-actualizar-imagen.page';

describe('ModalActualizarImagenPage', () => {
  let component: ModalActualizarImagenPage;
  let fixture: ComponentFixture<ModalActualizarImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActualizarImagenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalActualizarImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
