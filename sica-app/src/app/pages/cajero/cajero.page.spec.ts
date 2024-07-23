import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CajeroPage } from './cajero.page';

describe('CajeroPage', () => {
  let component: CajeroPage;
  let fixture: ComponentFixture<CajeroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CajeroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
