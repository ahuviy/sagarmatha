import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LocalStorageService } from './local-storage.service';
import { Db, Client, ClientToAdd, Order, OrderToAdd } from '../interfaces/data-model.interface';

@Injectable()
export class DataService {
    constructor(private localStorageService: LocalStorageService) { }

    /**
     * Basic CRUD for clients using LocalStorage as a mock back end.
     */
    clients = {
        get: (id?: string): Observable<Client[]> => {
            const db = this.localStorageService.get('db') || this.getEmptyDb();
            if (id) {
                const client = db.clients.find(c => c.id === id);
                return client ? of([client]) : of([]);
            }
            return of(db.clients);
        },
        delete: (clientId: string): Observable<Client[]> => {
            const db: Db = this.localStorageService.get('db') || this.getEmptyDb();
            db.clients = db.clients.filter(client => client.id !== clientId);
            db.orders = db.orders.filter(o => o.clientId !== clientId);
            this.localStorageService.set('db', db);
            return of(db.clients);
        },
        add: (clientToAdd: ClientToAdd): Observable<Client> => {
            const db: Db = this.localStorageService.get('db') || this.getEmptyDb();
            const existingIds = db.clients.map(c => c.id);
            const id = this.genUniqueId(existingIds);
            const added: Client = Object.assign({}, clientToAdd, { id });
            db.clients.push(added);
            this.localStorageService.set('db', db);
            return of(added);
        },
        edit: (newClient: Client): Observable<Client> => {
            const db: Db = this.localStorageService.get('db') || this.getEmptyDb();
            const edited = db.clients.find(c => c.id === newClient.id);
            if (!edited) return of(null);
            Object.assign(edited, newClient);
            this.localStorageService.set('db', db);
            return of(edited);
        }
    }

    /**
     * Basic CRUD for orders using LocalStorage as a mock back end.
     */
    orders = {
        get: (): Observable<Order[]> => {
            const db = this.localStorageService.get('db') || this.getEmptyDb();
            return of(db.orders);
        },
        delete: (orderId: string): Observable<Order[]> => {
            const db: Db = this.localStorageService.get('db') || this.getEmptyDb();
            db.orders = db.orders.filter(order => order.id !== orderId);
            this.localStorageService.set('db', db);
            return of(db.orders);
        },
        add: (orderToAdd: OrderToAdd): Observable<Order> => {
            const db: Db = this.localStorageService.get('db') || this.getEmptyDb();
            const existingIds = db.orders.map(o => o.id);
            const id = this.genUniqueId(existingIds);
            const added: Order = Object.assign({}, orderToAdd, { id });
            db.orders.push(added);
            this.localStorageService.set('db', db);
            return of(added);
        },
        edit: (newOrder: Order): Observable<Order> => {
            const db: Db = this.localStorageService.get('db') || this.getEmptyDb();
            const edited = db.orders.find(o => o.id === newOrder.id);
            if (!edited) return of(null);
            Object.assign(edited, newOrder);
            this.localStorageService.set('db', db);
            return of(edited);
        }
    }

    private genUniqueId(existingIds?: string[]): string {
        existingIds = existingIds || [];
        let genId = () => Math.floor(Math.random() * (10 ** 8)).toString();
        let id: string;
        do {
            id = genId();
        } while (existingIds.includes(id));
        return id;
    }

    private getEmptyDb(): Db {
        return { clients: [], orders: [] };
    }
}
