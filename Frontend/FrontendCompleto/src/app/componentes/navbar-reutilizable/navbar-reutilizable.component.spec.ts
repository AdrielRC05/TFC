import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarReutilizableComponent } from './navbar-reutilizable.component';

describe('NavbarReutilizableComponent', () => {
  let component: NavbarReutilizableComponent;
  let fixture: ComponentFixture<NavbarReutilizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarReutilizableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarReutilizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
