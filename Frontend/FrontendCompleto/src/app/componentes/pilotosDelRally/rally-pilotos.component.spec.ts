import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RallyPilotosComponent } from './rally-pilotos.component';

describe('RallyPilotosComponent', () => {
  let component: RallyPilotosComponent;
  let fixture: ComponentFixture<RallyPilotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RallyPilotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RallyPilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
