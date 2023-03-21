import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintballComponent } from './paintball.component';

describe('PaintballComponent', () => {
  let component: PaintballComponent;
  let fixture: ComponentFixture<PaintballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaintballComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaintballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
