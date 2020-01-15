import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GastoPage } from './gasto.page';

describe('GastoPage', () => {
  let component: GastoPage;
  let fixture: ComponentFixture<GastoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GastoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
