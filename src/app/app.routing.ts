import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsPage } from './pages/clients/clients.page';
import { OrdersPage } from './pages/orders/orders.page';

const routes: Routes = [
    {
        path: 'clients',
        component: ClientsPage
    },
    {
        path: 'orders',
        component: OrdersPage
    },
    {
        path: '**',
        redirectTo: 'clients'
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);
