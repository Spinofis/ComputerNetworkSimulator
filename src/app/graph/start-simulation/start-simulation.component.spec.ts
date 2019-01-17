import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSimulationComponent } from './start-simulation.component';

describe('StartSimulationComponent', () => {
  let component: StartSimulationComponent;
  let fixture: ComponentFixture<StartSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartSimulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
