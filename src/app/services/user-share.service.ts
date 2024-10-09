import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userListSubject = new BehaviorSubject<any[]>([]);
  userList$ = this.userListSubject.asObservable();

  setUserList(userList: any[]) {
    this.userListSubject.next(userList);
  }

  getUserList() {
    return this.userListSubject.getValue();
  }
}