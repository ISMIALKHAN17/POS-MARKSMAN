import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcheryFinalComponent } from './archery-final.component';

describe('ArcheryFinalComponent', () => {
  let component: ArcheryFinalComponent;
  let fixture: ComponentFixture<ArcheryFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArcheryFinalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcheryFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
