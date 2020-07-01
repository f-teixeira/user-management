import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'https://uitest.free.beeceptor.com/usernames';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl)
      .pipe(
        catchError(err => {
          console.log('error occured: ', err);
          return [];
        })
      );
  }
}
