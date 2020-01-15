import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalGastoPage } from './modal-gasto.page';

describe('ModalGastoPage', () => {
  let component: ModalGastoPage;
  let fixture: ComponentFixture<ModalGastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGastoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
