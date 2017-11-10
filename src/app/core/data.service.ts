import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { LocalStorageService } from './local-storage.service';
import { Db, Client, ClientToAdd } from '../interfaces/data-model.interface';
import { EMPTY_ARRAY } from '@angular/core/src/view/util';

const getEmptyDb = (): Db => {
    return { clients: [], orders: [] };
};

@Injectable()
export class DataService {
    constructor(private localStorageService: LocalStorageService) { }

    /**
     * Basic CRUD for clients using LocalStorage as a mock back end.
     */
    clients = {
        get: (): Observable<Client[]> => {
            const db = this.localStorageService.get('db') || getEmptyDb();
            return of(db.clients);
        },
        delete: (clientId: string): Observable<Client[]> => {
            const db: Db = this.localStorageService.get('db') || getEmptyDb();
            db.clients = db.clients.filter(client => client.id !== clientId);
            this.localStorageService.set('db', db);
            return of(db.clients);
        },
        add: (clientToAdd: ClientToAdd): Observable<Client> => {
            const db: Db = this.localStorageService.get('db') || getEmptyDb();
            const existingIds = db.clients.map(c => c.id)
            const id = this.genUniqueId(existingIds);
            const added: Client = Object.assign({}, clientToAdd, { id });
            db.clients.push(added);
            this.localStorageService.set('db', db);
            return of(added);
        },
        edit: (newClient: Client): Observable<Client> => {
            const db: Db = this.localStorageService.get('db') || getEmptyDb();
            const edited = db.clients.find(c => c.id === newClient.id);
            if (!edited) return of(null);
            Object.assign(edited, newClient);
            this.localStorageService.set('db', db);
            return of(edited);
        }
    }

    private genUniqueId(existingIds?: string[]): string {
        existingIds = existingIds || [];
        let genId = (): string => Math.floor(Math.random() * (10 ** 8)).toString();
        let id: string;
        do {
            id = genId();
        } while (existingIds.includes(id));
        return id;
    }
}
