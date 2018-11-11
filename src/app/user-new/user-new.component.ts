import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

import { User } from '../user';


@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  user: User;
  actionSuccess: boolean;
  actionError: boolean;
  actionName: string;
  
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
  }

  cancel() {
    this.router.navigate([`users`]);
  }

  save() {
    this.actionName = "saved";  
    this.userService.addUser(this.user).subscribe(data => {
      this.user.id = data.id;
      this.router.navigate([`user/${this.user.id}`], { queryParams: { actionSuccess: true } });
    },
    error => {
      this.actionError = true;      
    });
  }
}
