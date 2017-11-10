import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

// A quick-and-dirty wrapper around ngx-bootstrap modalService.
@Injectable()
export class ModalService {
    constructor(private bsModalService: BsModalService) { }

    /**
     * Opens a modal and resolves after it closes. Supplies the inner-modal-component
     * with a 'close' function that closes the modal with an optional value. Pass-on
     * arguments to the modal using args. They will be available in the inner-component
     * under args. When using args in 'OnInit' lifecycle hook you must wrap them in
     * a 'setTimeout' because the VM needs to process one tick before they are available.
     * Currently does not support nested modals.
     */
    show(component: any, args?: any, options?: any): Promise<any> {
        return new Promise(resolve => {
            options = options || {};
            const modal = this.bsModalService.show(component, options);
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
