import { Routes } from '@angular/router';
import { ListComponent } from './componentes/list/list.component';
import { AddComponent } from './componentes/add/add.component';


export const routes: Routes = [

    {path: 'list', component: ListComponent},
    {path: 'add', component: AddComponent},
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: '**', redirectTo: '/list'}

    


];
