import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Observable, of } from 'rxjs';
import { User } from '../user';
import { UsersService } from '../users.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let usersService: UsersService;
  let fixture: ComponentFixture<UserListComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [
        { provide: UsersService, useClass: MockUsersService }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));


  beforeEach(() => {
    usersService = TestBed.inject(UsersService);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users', () => {
    expect(component.userList.length).toBe(testUsers.length);
    const userListItemElements = fixture.nativeElement.querySelectorAll('app-user-list-item');
    expect(userListItemElements.length).toBe(component.userList.length);


  });

  it('should add user', () => {
    const newUser = { name: 'Anthony' };
    component.addUser(newUser);

    fixture.detectChanges();

    expect(component.userList.length).toBe(testUsers.length + 1);
    expect(component.userList.includes(newUser)).toBeTrue();

    const userListItemElements = fixture.nativeElement.querySelectorAll('app-user-list-item');
    expect(userListItemElements.length).toBe(component.userList.length);
  });

  it('should delete user', () => {
    const userToDelete = testUsers[0];
    component.deleteUser(userToDelete);

    fixture.detectChanges();

    expect(component.userList.length).toBe(testUsers.length - 1);
    expect(component.userList.includes(userToDelete)).toBeFalse();

    const userListItemElements = fixture.nativeElement.querySelectorAll('app-user-list-item');
    expect(userListItemElements.length).toBe(component.userList.length);
  });

  it('should delete all users', () => {
    const deleteAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#delete-all-button');
    expect(deleteAllButtonElement).toBeTruthy();
    deleteAllButtonElement.click();

    fixture.detectChanges();

    expect(component.userList.length).toBe(0);

    const userListItemElements = fixture.nativeElement.querySelectorAll('app-user-list-item');
    expect(userListItemElements.length).toBe(0);
  });

  it('should set global edit to true and show Save All button', () => {
    const editAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#edit-all-button');
    expect(editAllButtonElement).toBeTruthy();
    editAllButtonElement.click();

    fixture.detectChanges();

    expect(component.isGlobalEdit).toBeTrue();
    const deleteAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#delete-all-button');
    expect(deleteAllButtonElement).toBeNull();

    const saveAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#save-all-button');
    expect(saveAllButtonElement).toBeTruthy();

  });

  it('should set global edit to false', () => {
    component.editAll();

    fixture.detectChanges();

    expect(component.isGlobalEdit).toBeTrue();
    const saveAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#save-all-button');
    expect(saveAllButtonElement).toBeTruthy();
    saveAllButtonElement.click();

    fixture.detectChanges();
    expect(component.isGlobalEdit).toBeFalse();

    const deleteAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#delete-all-button');
    expect(deleteAllButtonElement).toBeTruthy();

    const editAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#edit-all-button');
    expect(editAllButtonElement).toBeTruthy();
  });

  it('should hide edit all and delete all buttons', () => {
    component.deleteAll();

    fixture.detectChanges();

    expect(component.userList.length).toBe(0);

    const deleteAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#delete-all-button');
    expect(deleteAllButtonElement).toBeFalsy();

    const editAllButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#edit-all-button');
    expect(editAllButtonElement).toBeFalsy();
  });


});

const testUsers: User[] =
  [{ name: 'John' }, { name: 'Sam' }];

class MockUsersService {
  getUsers(): Observable<User[]> {
    return of([ ...testUsers ]);
  }
}
