import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

const api = '/api';
export const userIdRoute = "user";
export const usersRoute = "users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<User>>(`${api}/${usersRoute}`)
  }

  //getUser(id: number) {
  getUser(id: string) {
    return this.http.get<User>(`${api}/${userIdRoute}/${id}`)
  }

  deleteUser(user: User) {
    return this.http.delete(`${api}/${userIdRoute}/${user.id}`);
  }

  addUser(user: User) {
    return this.http.post<User>(`${api}/${userIdRoute}`, user);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${api}/${userIdRoute}/${user.id}`, user);
  }  
}
