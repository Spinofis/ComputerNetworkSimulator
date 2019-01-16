import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PcConfiguratorComponent } from './pc-configurator.component';

describe('PcConfiguratorComponent', () => {
  let component: PcConfiguratorComponent;
  let fixture: ComponentFixture<PcConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PcConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
