import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalActualizarContraseAPage } from './modal-actualizar-contraseña.page';

describe('ModalActualizarContraseAPage', () => {
  let component: ModalActualizarContraseAPage;
  let fixture: ComponentFixture<ModalActualizarContraseAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActualizarContraseAPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalActualizarContraseAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
