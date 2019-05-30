import { Component, OnInit } from '@angular/core';
import { UserService } from '../userForm/user.service';
@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: any;
    constructor(
        private userService: UserService) { }
    ngOnInit() {
        this.userService.getUserData()
            .subscribe(result => {
                this.users = result;
            })
    }

}