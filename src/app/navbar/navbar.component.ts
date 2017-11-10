import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    styleUrls: ['./navbar.component.scss'],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    menu = [
        { label: 'Clients', link: '/clients' },
        { label: 'Orders', link: '/orders' }
    ];
}
