import { Component,  EventEmitter, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { switchMap } from 'rxjs/operators';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
//export class UserDetailComponent implements OnInit /*, OnChanges */ {
export class UserDetailComponent {
  @Input() user: User;
  @Input() isEditable: boolean;
  @Input() actionSuccess: boolean;
  @Input() actionError: boolean;
  @Input() actionName: string;
  @Output() needToSave = new EventEmitter<boolean>();
  @Output() needToCancel = new EventEmitter<boolean>();
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
     }

     /**
  ngOnInit() {
  }
   */

  cancel() {
    this.needToCancel.emit(true);
  }

  save() {  
    this.needToSave.emit(true);
  }
}
