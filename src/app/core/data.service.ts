import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import * as model from '../interfaces/data-model.interface';

@Injectable()
export class DataService {
    constructor(private localStorageService: LocalStorageService) {
        const db = this.localStorageService.get('db');
        if (!db) {
            this.initDb();
        }
    }

    /**
     * Create some initial data
     */
    initDb() {
        const db: model.Db = {
            clients: [
                { id: 'ahuviyearim', firstName: 'Ahuvi', lastName: 'Yearim' },
                { id: 'jsrpinger', firstName: 'Jerry', lastName: 'Springer' },
                { id: 'ebravo', firstName: 'Eddie', lastName: 'Bravo' }
            ],
            orders: [
                { id: 'ahuviorder1', clientId: 'ahuviyearim', description: 'Some eggs' }
            ]
        };
        this.localStorageService.set('db', db);
    }

    getClients(): model.Client[] {
        const db = this.localStorageService.get('db');
        if (!db) return [];
        return db.clients;
    }
}
