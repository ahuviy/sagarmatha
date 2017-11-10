import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Client } from '../../interfaces/data-model.interface';

@Component({
    selector: 'modal-content',
    templateUrl: './are-you-sure.modal.html'
})
export class AreYouSureModal {
    args: { client: Client };
    close: (val?: any) => void;
}
