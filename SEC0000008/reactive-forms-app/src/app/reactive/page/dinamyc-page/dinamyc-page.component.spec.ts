import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycPageComponent } from './dinamyc-page.component';

describe('DinamycPageComponent', () => {
  let component: DinamycPageComponent;
  let fixture: ComponentFixture<DinamycPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamycPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamycPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
