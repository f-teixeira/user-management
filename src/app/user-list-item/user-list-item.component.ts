import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  isGlobalEdit = false;

  @Output()
  deleteUser = new EventEmitter<any>();

  isEdit = false;

  constructor() { }

  ngOnInit(): void {
  }

  edit(): void {
    this.isEdit = true;
  }

  save(): void {
    this.isEdit = false;
  }

  delete(): void{
    this.deleteUser.emit(this.user);
  }

}
