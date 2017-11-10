import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    styleUrls: ['./navbar.component.scss'],
    template: `
        <div class="nav-bar">
            <a class="link" *ngFor="let item of menu" [routerLink]="item.link">
                {{item.label}}
            </a>
        </div>
    `
})
export class NavbarComponent {
    menu = [
        { label: 'Clients', link: '/clients' },
        { label: 'Orders', link: '/orders/all' }
    ];
}
