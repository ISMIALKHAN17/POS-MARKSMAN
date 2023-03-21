import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutsalComponent } from './futsal.component';

describe('FutsalComponent', () => {
  let component: FutsalComponent;
  let fixture: ComponentFixture<FutsalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutsalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutsalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
