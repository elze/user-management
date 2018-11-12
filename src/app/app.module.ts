import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserExistingComponent } from './user-existing/user-existing.component';
import { UserNewComponent } from './user-new/user-new.component';

const appRoutes: Routes = [  
  { path: 'users', component: UsersComponent},
  { path: 'user', component: UserNewComponent},
  { path: 'user/:id', component: UserExistingComponent},
  { path: '', component: UsersComponent}
];  


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    UserExistingComponent,
    UserNewComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
  ),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
