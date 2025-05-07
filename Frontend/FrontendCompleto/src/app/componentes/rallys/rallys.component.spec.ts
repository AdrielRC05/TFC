import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RallysComponent } from './rallys.component';

describe('RallysComponent', () => {
  let component: RallysComponent;
  let fixture: ComponentFixture<RallysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RallysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RallysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
