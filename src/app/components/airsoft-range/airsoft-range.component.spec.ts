import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirsoftRangeComponent } from './airsoft-range.component';

describe('AirsoftRangeComponent', () => {
  let component: AirsoftRangeComponent;
  let fixture: ComponentFixture<AirsoftRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirsoftRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirsoftRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
