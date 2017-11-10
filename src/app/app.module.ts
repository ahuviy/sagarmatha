import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRouting } from './app.routing';
import { ClientsPage } from './pages/clients/clients.page';
import { OrdersPage } from './pages/orders/orders.page';
import { NavbarComponent } from './navbar/navbar.component';
import { AreYouSureModal } from './modals/are-you-sure/are-you-sure.modal';
import { AddClientModal } from './modals/add-client/add-client.modal';
import { AddOrderModal } from './modals/add-order/add-order.modal';

@NgModule({
    declarations: [
        AppComponent,
        ClientsPage,
        OrdersPage,
        NavbarComponent,
        AreYouSureModal,
        AddClientModal,
        AddOrderModal,
    ],
    entryComponents: [
        AreYouSureModal,
        AddClientModal,
        AddOrderModal,
    ],
    imports: [
        AppRouting,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        ModalModule.forRoot(),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
