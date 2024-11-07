import { Routes } from '@angular/router';
import { ListComponent } from './componentes/main/list/list.component';
import { AddComponent } from './componentes/main/add/add.component';
import { DetailComponent } from './componentes/main/detail/detail.component';
import { EditComponent } from './componentes/main/edit/edit.component';




export const routes: Routes = [

    {path: 'list', component: ListComponent},
    {path: 'add', component: AddComponent},
    {path: 'tarea/:id', component: DetailComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: '**', redirectTo: '/list'}

    


];
