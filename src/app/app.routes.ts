import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [

    {path: 'list', component: ListComponent},
    {path: 'add', component: AddComponent},
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: '**', redirectTo: '/list'}

    


];
