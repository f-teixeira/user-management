import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserComponent } from './new-user.component';
import { FormsModule } from '@angular/forms';
import { User } from '../user';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;

  const newUserName = 'John';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ NewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addUser', () => {
    let addedUser: User;

    component.addUser.subscribe((user: User) => addedUser = user);

    expect(component.newUserInput).toBeNull();

    const addButtonDisabledElement: HTMLButtonElement = fixture.nativeElement.querySelector('#add-user-button');
    expect(addButtonDisabledElement).toBeTruthy();

    expect(addButtonDisabledElement.disabled).toBeTruthy();

    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement).toBeTruthy();
    inputElement.value = newUserName;
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const addButtonElement: HTMLButtonElement = fixture.nativeElement.querySelector('#add-user-button');
    expect(addButtonElement).toBeTruthy();

    expect(addButtonElement.disabled).toBeFalsy();

    expect(component.newUserInput).toBe(newUserName);

    addButtonElement.click();
    expect(addedUser.name).toBe(newUserName);
  });
});
