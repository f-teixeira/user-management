import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListItemComponent } from './user-list-item.component';
import { FormsModule } from '@angular/forms';
import { User } from '../user';

describe('UserListItemComponent', () => {
  let component: UserListItemComponent;
  let fixture: ComponentFixture<UserListItemComponent>;

  const originalName = 'John';
  const newName = 'Albert';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ UserListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListItemComponent);
    component = fixture.componentInstance;
    component.user = { name: originalName };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should contain "John"', () => {
    const pElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toEqual(originalName);
  });

  it('should edit to "Albert"', () => {
    expect(component.user.name).toBe(originalName);

    const editButtonElement: HTMLElement = fixture.nativeElement.querySelector('#edit-button');
    editButtonElement.click();
    expect(component.isEdit).toBe(true);

    fixture.detectChanges();

    const pElement: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pElement).toBeNull();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    inputElement.value = newName;
    inputElement.dispatchEvent(new Event('input'));


    const saveButtonElement: HTMLElement = fixture.nativeElement.querySelector('#save-button');
    saveButtonElement.click();
    expect(component.isEdit).toBe(false);

    fixture.detectChanges();

    const pElementAfter: HTMLElement = fixture.nativeElement.querySelector('p');
    expect(pElementAfter.textContent).toBe(newName);
    expect(component.user.name).toBe(newName);
  });

  it('should show Save button', () => {
    fixture.nativeElement.querySelector('#edit-button').click();
    expect(component.isEdit).toBe(true);

    fixture.detectChanges();
    const editButtonElement: HTMLElement = fixture.nativeElement.querySelector('#edit-button');
    expect(editButtonElement).toBeNull();

    const saveButtonElement: HTMLElement = fixture.nativeElement.querySelector('#save-button');
    expect(saveButtonElement).toBeTruthy();
  });

  it('should emit deleteUser', () => {
    let emitedUser: User;

    component.deleteUser.subscribe((user: User) => emitedUser = user);
    const deleteButtonElement: HTMLElement = fixture.nativeElement.querySelector('#delete-button');
    expect(deleteButtonElement).toBeTruthy();

    deleteButtonElement.click();
    expect(emitedUser).toBe(component.user);
  });

  it('should show input when isGlobalEdit is true', () => {
    component.isGlobalEdit = true;

    fixture.detectChanges();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
  });

  it('should hide buttons when isGlobalEdit is true', () => {
    component.isGlobalEdit = true;

    fixture.detectChanges();

    const inputElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(inputElement).toBeFalsy();
  });

});
