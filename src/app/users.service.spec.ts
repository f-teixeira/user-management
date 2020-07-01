

import { UsersService } from './users.service';
import { User } from './user';
import { defer, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('UsersService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let service: UsersService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UsersService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    const users: User[] =
      [{ name: 'John' }, { name: 'Sam' }];

    httpClientSpy.get.and.returnValue(of(users));

    service.getUsers().subscribe(
      u => expect(u).toEqual(users, 'users not correct'),
      fail
    );
  });


  it('should return an empty list when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: '404',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue( defer(() => Promise.reject(errorResponse)));

    service.getUsers().subscribe(
      u => expect(u).toEqual([], 'users not correct'),
      fail
    );
  });
});
