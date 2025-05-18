import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryLayoutComponent } from './country-layout.component';

describe('CountryLayoutComponent', () => {
  let component: CountryLayoutComponent;
  let fixture: ComponentFixture<CountryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
