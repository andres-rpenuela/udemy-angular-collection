import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsListItemComponent } from './gifs-list-item.component';

describe('GifsListItemComponent', () => {
  let component: GifsListItemComponent;
  let fixture: ComponentFixture<GifsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifsListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
