import { Component } from '@angular/core';
import { DataService } from '../../core/data.service';
import { ModalService } from '../../core/modal.service';
import { Client } from '../../interfaces/data-model.interface';
import { AreYouSureModal } from '../../modals/are-you-sure/are-you-sure.modal';
import { AddClientModal } from '../../modals/add-client/add-client.modal';

@Component({
    selector: 'clients-page',
    styleUrls: ['./clients.page.scss'],
    templateUrl: './clients.page.html'
})
export class ClientsPage {
    clients: Client[];

    constructor(
        private dataService: DataService,
        private modalService: ModalService
    ) { }

    ngOnInit() {
        this.dataService.clients.get().subscribe(clients => {
            this.clients = clients.sort(this.sortByLastName);
        });
    }

    edit(event, client: Client) {
        event.target.blur();
        this.modalService.show(AddClientModal, { client }).then(editedClient => {
            if (!editedClient) return;
            const clientToUpdate = this.clients.find(c => c.id === editedClient.id);
            Object.assign(clientToUpdate, editedClient);
            this.clients.sort(this.sortByLastName);
        });
    }

    delete(event, client: Client) {
        event.target.blur();
        this.modalService.show(AreYouSureModal, { client }).then(confirmed => {
            if (!confirmed) return;
            this.dataService.clients.delete(client.id).subscribe(clients => {
                this.clients = clients;
            });
        });
    }

    add(event) {
        event.target.blur();
        this.modalService.show(AddClientModal).then(addedClient => {
            if (!addedClient) return;
            this.clients.push(addedClient);
            this.clients.sort(this.sortByLastName);
        });
    }

    trackByClientIds(index: number, client: Client) {
        return client.id;
    }

    private sortByLastName(a: Client, b: Client) {
        const aLowercase = a.lastName.toLowerCase();
        const bLowercase = b.lastName.toLowerCase();
        if (aLowercase > bLowercase) return 1;
        else if (bLowercase > aLowercase) return -1;
        else return 0;
    }
}
