import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable()
export class ModalService {
    constructor(private bsModalService: BsModalService) { }

    /**
     * Opens a modal. Currently does not support nested modals.
     */
    show(component: any, args?: any): Promise<any> {
        return new Promise(resolve => {
            const modal = this.bsModalService.show(component);
            let res: any;
            const sub = this.bsModalService.onHidden.subscribe(() => {
                sub.unsubscribe();
                resolve(res);
            });
            modal.content.args = args;
            modal.content.close = (val?: any) => {
                res = val;
                modal.hide();
            };
        });
    }
}
