import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemInformationComponent } from './view-item-information.component';

describe('ViewItemInformationComponent', () => {
  let component: ViewItemInformationComponent;
  let fixture: ComponentFixture<ViewItemInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItemInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItemInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
