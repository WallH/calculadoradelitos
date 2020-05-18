import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadorComponent } from './calculador.component';

describe('CalculadorComponent', () => {
  let component: CalculadorComponent;
  let fixture: ComponentFixture<CalculadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
