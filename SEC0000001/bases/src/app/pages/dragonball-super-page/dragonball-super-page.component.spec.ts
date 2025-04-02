import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragonballSuperPageComponent } from './dragonball-super-page.component';

describe('DragonballSuperPageComponent', () => {
  let component: DragonballSuperPageComponent;
  let fixture: ComponentFixture<DragonballSuperPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragonballSuperPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragonballSuperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
