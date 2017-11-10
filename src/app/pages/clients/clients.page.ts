import { Component } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Client } from '../../interfaces/data-model.interface';

@Component({
    selector: 'clients-page',
    styleUrls: ['./clients.page.scss'],
    templateUrl: './clients.page.html'
})
export class ClientsPage {
    clients: Client[];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.clients = this.dataService.getClients().sort(this.sortByLastName);
    }

    edit(client: Client) {
        console.log('editing:', client);
    }

    delete(client: Client) {
        console.log('deleting:', client);
    }

    add() {
        console.log('adding client');
    }

    private sortByLastName(a: Client, b: Client) {
        if (a.lastName > b.lastName) return 1;
        else if (b.lastName > a.lastName) return -1;
        else return 0;
    }
}
