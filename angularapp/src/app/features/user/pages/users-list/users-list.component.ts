import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/core/models/responses/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  userTableColumns: string[] = [
    'name',
    'lastName',
    'middleName',
    'age',
    'roles',
  ];
  public users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      result => {
        this.users = result;
      },
      error => console.error(error)
    );
  }
}
