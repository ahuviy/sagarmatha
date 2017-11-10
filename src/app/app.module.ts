import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { AppRouting } from './app.routing';
import { ClientsPage } from './pages/clients/clients.page';
import { OrdersPage } from './pages/orders.page';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        ClientsPage,
        OrdersPage,
        NavbarComponent,
    ],
    imports: [
        AppRouting,
        BrowserModule,
        CoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
