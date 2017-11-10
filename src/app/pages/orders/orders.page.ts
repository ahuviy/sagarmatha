import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import { DataService } from '../../core/data.service';
import { ModalService } from '../../core/modal.service';
import { AddOrderModal } from '../../modals/add-order/add-order.modal';
import { AreYouSureModal } from '../../modals/are-you-sure/are-you-sure.modal';
import { Order, Client } from '../../interfaces/data-model.interface';

@Component({
    selector: 'orders-page',
    templateUrl: './orders.page.html'
})
export class OrdersPage {
    orders: Order[];
    client: Client;

    constructor(
        private dataService: DataService,
        private modalService: ModalService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const clientId = this.route.snapshot.queryParams.id;

        const client$ = clientId ? this.dataService.clients.get(clientId) : of([]);
        const orders$ = this.dataService.orders.get();

        combineLatest(client$, orders$).subscribe(res => {
            const client: Client = res[0].length ? res[0][0] : null;
            const orders: Order[] = res[1];
            this.client = client;

            // If there is no associated client we will show all orders. Otherwise,
            // we will only show the orders of the associated client.
            this.orders = client ? orders.filter(o => o.clientId === client.id) : orders;
        });
    }

    add(event) {
        event.target.blur();
        const clientId = this.client.id;
        this.modalService.show(AddOrderModal, { clientId }).then(addedOrder => {
            if (!addedOrder) return;
            if (!this.client) return; // we can't add an order if there is no associated client
            addedOrder.clientId = this.client.id;
            this.orders.push(addedOrder);
        });
    }

    edit(event, order: Order) {
        event.target.blur();
        this.modalService.show(AddOrderModal, { order }).then(editedOrder => {
            if (!editedOrder) return;
            const orderToUpdate = this.orders.find(o => o.id === editedOrder.id);
            Object.assign(orderToUpdate, editedOrder);
        });
    }

    delete(event, order: Order) {
        event.target.blur();
        const itemName = order.description;
        this.modalService.show(AreYouSureModal, { itemName }).then(confirmed => {
            if (!confirmed) return;
            this.dataService.orders.delete(order.id).subscribe(orders => {
                this.orders = this.client ? orders.filter(o => o.clientId === this.client.id) : orders;
            });
        });
    }

    trackByOrderIds(index: number, order: Order) {
        return order.id;
    }
}
