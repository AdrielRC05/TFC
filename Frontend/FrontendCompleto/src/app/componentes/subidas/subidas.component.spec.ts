import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidasComponent } from './subidas.component';

describe('SubidasComponent', () => {
  let component: SubidasComponent;
  let fixture: ComponentFixture<SubidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubidasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
