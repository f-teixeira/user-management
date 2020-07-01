import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUserInput: string = null;

  @Output()
  addUser = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  submit(): void {
    this.addUser.emit({ name: this.newUserInput});
    this.newUserInput = null;
  }

}
