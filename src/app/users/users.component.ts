import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from '../user';
import { UserService, userIdRoute, usersRoute } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  addingUser = false;
  users: any = [];
  selectedUser: User;
  actionSuccess: boolean;
  actionError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {}

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.actionSuccess = params['actionSuccess'] || null;
        this.actionError = params['actionError'] || null;
      });    
   this.getUsers();
  }

  deleteUser(user: User) {
    this.actionSuccess = null;
    this.actionError = null;
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true) {
      this.userService.deleteUser(user).subscribe(res => {
        this.users = this.users.filter(h => h !== user);
        this.actionSuccess = true;
      },
      error => {
        this.actionError = true;
        });
    }
  }

  getUsers() {
    return this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  getUserLink(user: User): string {
    return `/${userIdRoute}/${user.id}`
  }
}
