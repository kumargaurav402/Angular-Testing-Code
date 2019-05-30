import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserComponent } from './userForm/user-create.component';
import { UserListComponent } from './userForm/user-list.component';

const appRoute: Routes = [
    { path: 'list', component: UserListComponent },
    { path: 'create', component: UserComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' }
]
@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }