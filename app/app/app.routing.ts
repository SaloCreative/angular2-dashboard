import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent }  from '../clients/client-list.component';
import { ClientDetailComponent }  from '../clients/client-detail.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { NotFoundComponent } from "../error/404.component";
import {ProjectListComponent} from "../projects/project-list.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'clients',
        component: ClientListComponent
    },
    {
        path: 'client/:id',
        component: ClientDetailComponent
    },
    {
        path: 'projects',
        component: ProjectListComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    {   path: '**',
        redirectTo: '/not-found'
    }
];

export const routing = RouterModule.forRoot(appRoutes);