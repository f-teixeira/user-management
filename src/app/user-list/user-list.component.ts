import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];

  isGlobalEdit = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(list => this.userList = list);
  }

  addUser(newUser: User): void {
    this.userList.push(newUser);
  }

  deleteUser(user: User): void {
    this.userList = this.userList.filter(u => u !== user);
  }

  saveAll(): void {
    this.isGlobalEdit = false;
  }

  editAll(): void {
    this.isGlobalEdit = true;
  }

  deleteAll(): void {
    this.userList = [];
  }

}
