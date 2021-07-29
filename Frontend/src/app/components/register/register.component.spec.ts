import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MustMatchDirective } from 'src/app/directives/must-match.directive';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ RegisterComponent, NavbarComponent, MustMatchDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test registerForm exists in Register Component', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const element = fixture.nativeElement.querySelector('form');
    expect(element.innerHTML).toBeDefined();
  });

  it('Test password element exists in Register Component', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const element = fixture.nativeElement.querySelector('input');
    expect(element.innerHTML).toBeDefined();
  });
});
