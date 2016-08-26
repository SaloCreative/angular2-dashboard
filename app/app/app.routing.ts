import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent }  from '../clients/client-list.component';
import { ClientDetailComponent }  from '../clients/client-detail.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { NotFoundComponent } from "../error/404.component";

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
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'not-found',
        name: 'NotFound',
        component: NotFoundComponent
    },
    {   path: '**',
        redirectTo: '/not-found'
    }
];

export const routing = RouterModule.forRoot(appRoutes);