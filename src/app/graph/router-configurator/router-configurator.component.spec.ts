import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterConfiguratorComponent } from './router-configurator.component';

describe('RouterConfiguratorComponent', () => {
  let component: RouterConfiguratorComponent;
  let fixture: ComponentFixture<RouterConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
