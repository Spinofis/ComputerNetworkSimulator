import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostConfigurator } from './host-configurator.component';

describe('PcConfiguratorComponent', () => {
  let component: HostConfigurator;
  let fixture: ComponentFixture<HostConfigurator>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostConfigurator ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostConfigurator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
