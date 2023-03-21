import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndoorCricketComponent } from './indoor-cricket.component';

describe('IndoorCricketComponent', () => {
  let component: IndoorCricketComponent;
  let fixture: ComponentFixture<IndoorCricketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndoorCricketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndoorCricketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
