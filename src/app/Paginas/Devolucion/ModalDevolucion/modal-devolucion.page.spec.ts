import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDevolucionPage } from './modal-devolucion.page';

describe('ModalDevolucionPage', () => {
  let component: ModalDevolucionPage;
  let fixture: ComponentFixture<ModalDevolucionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDevolucionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDevolucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
