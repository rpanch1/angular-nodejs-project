import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { NavbarComponent } from '../navbar/navbar.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ LoginComponent, NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test loginForm exists in Login Component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const element = fixture.nativeElement.querySelector('form');
    expect(element.innerHTML).toBeDefined();
  });

  it('Test email element exists Login Component', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const element = fixture.nativeElement.querySelector('input');
    expect(element.innerHTML).toBeDefined();
  });
});
