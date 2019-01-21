import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSavedListComponent } from './graph-saved-list.component';

describe('GraphSavedListComponent', () => {
  let component: GraphSavedListComponent;
  let fixture: ComponentFixture<GraphSavedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphSavedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphSavedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
