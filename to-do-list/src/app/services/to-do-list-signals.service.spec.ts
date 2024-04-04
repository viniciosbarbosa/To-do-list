import { TestBed } from '@angular/core/testing';

import { ToDoListSignalsService } from './to-do-list-signals.service';

describe('ToDoListSignalsService', () => {
  let service: ToDoListSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListSignalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
