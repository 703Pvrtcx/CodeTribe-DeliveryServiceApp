import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SidemenuPage } from './sidemenu.page';

describe('SidemenuPage', () => {
  let component: SidemenuPage;
  let fixture: ComponentFixture<SidemenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidemenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SidemenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
