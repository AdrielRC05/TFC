import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopilotosComponent } from './copilotos.component';

describe('CopilotosComponent', () => {
  let component: CopilotosComponent;
  let fixture: ComponentFixture<CopilotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopilotosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopilotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
