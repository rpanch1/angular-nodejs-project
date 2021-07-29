import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AdminGuardService } from './admin-guard.service';

describe('AdminGuardService', () => {
  let service: AdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule,
        FormsModule
      ],
    });
    service = TestBed.inject(AdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
