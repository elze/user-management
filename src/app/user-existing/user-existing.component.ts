import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-existing',
  templateUrl: './user-existing.component.html',
  styleUrls: ['./user-existing.component.scss']
})
export class UserExistingComponent implements OnInit {

  isEditable: boolean;
  user: User;
  actionSuccess: boolean;
  actionError: boolean;
  actionName: string = "saved";

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
    this.isEditable = false;    
   }

  ngOnInit() {

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => 
          this.userService.getUser(params.get('id'))))
      .subscribe(user => {
        this.user = user;
      },
      error => {
        this.actionError = true;
        this.actionName = "found";
        });

    this.route.queryParams
      .subscribe(params => {
        this.actionSuccess = params['actionSuccess'] || null;
      });  
  }

  getUserAction(): string {
    if (this.isEditable)
      return "Edit";
    return "View";
  }

  makeEditable(isEditable: boolean) {
    this.isEditable = isEditable;
    this.actionSuccess = null;
    this.actionError = null;
  
  }

  cancel() {
    this.userService.getUser(this.user.id.toString()).subscribe(user => {    
      this.user = user;
      this.isEditable = false;
    });            
  };

  deleteUser(user: User) {
    var r = confirm("Are you sure you want to delete this user?");
    if (r == true) {
      this.userService.deleteUser(user).subscribe(res => {
        this.router.navigate(['users'], { queryParams: { actionSuccess: true } });      
      },
      error => {
        this.actionError = true;
        this.actionName = "deleted";
        //console.log(`login error: ${JSON.stringify(error)}` );
        });
    }
  }


  save() {
    this.actionName = "saved";
    this.userService.updateUser(this.user).subscribe(data => {
      this.isEditable = false;
      this.actionSuccess = true;
    },
  error => {
    this.actionError = true;
    });
  }
}
