import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalRestablecerContrasenaPage } from './modal-restablecer-contrasena.page';

describe('ModalRestablecerContrasenaPage', () => {
  let component: ModalRestablecerContrasenaPage;
  let fixture: ComponentFixture<ModalRestablecerContrasenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRestablecerContrasenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalRestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
