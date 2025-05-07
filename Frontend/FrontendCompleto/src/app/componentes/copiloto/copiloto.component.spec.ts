import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopilotoComponent } from './copiloto.component';

describe('CopilotoComponent', () => {
  let component: CopilotoComponent;
  let fixture: ComponentFixture<CopilotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopilotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopilotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
