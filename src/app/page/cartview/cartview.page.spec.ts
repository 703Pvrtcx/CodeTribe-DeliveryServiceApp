import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartviewPage } from './cartview.page';

describe('CartviewPage', () => {
  let component: CartviewPage;
  let fixture: ComponentFixture<CartviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
