import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormFilterComponent } from './user-form-filter.component';

describe('UserFormFilterComponent', () => {
  let component: UserFormFilterComponent;
  let fixture: ComponentFixture<UserFormFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
