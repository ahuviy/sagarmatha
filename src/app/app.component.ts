import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    template: `
        <div class="header">
            <navbar></navbar>
        </div>    
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    
}
