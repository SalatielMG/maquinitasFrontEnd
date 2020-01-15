import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CajasCerradasPage } from './cajas-cerradas.page';

describe('CajasCerradasPage', () => {
  let component: CajasCerradasPage;
  let fixture: ComponentFixture<CajasCerradasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajasCerradasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CajasCerradasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
