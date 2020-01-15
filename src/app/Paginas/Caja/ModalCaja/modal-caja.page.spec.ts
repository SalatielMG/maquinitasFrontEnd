import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCajaPage } from './modal-caja.page';

describe('ModalCajaPage', () => {
  let component: ModalCajaPage;
  let fixture: ComponentFixture<ModalCajaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCajaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCajaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
