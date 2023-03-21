import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GelBlasterComponent } from './gel-blaster.component';

describe('GelBlasterComponent', () => {
  let component: GelBlasterComponent;
  let fixture: ComponentFixture<GelBlasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GelBlasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GelBlasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
