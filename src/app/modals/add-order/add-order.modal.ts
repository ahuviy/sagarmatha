import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/data.service';
import { Order } from '../../interfaces/data-model.interface';

@Component({
    selector: 'add-order',
    styleUrls: ['./add-order.modal.scss'],
    templateUrl: './add-order.modal.html'
})
export class AddOrderModal {
    @ViewChild('firstInput') firstInput: ElementRef;

    args: { order: Order; clientId: string; };
    close: (val?: any) => void;
    get isEditMode() { return this.args && this.args.order; }
    orderForm: FormGroup = this.fb.group({
        description: [null, Validators.required]
    });

    constructor(
        private fb: FormBuilder,
        private dataService: DataService
    ) { }

    ngOnInit() {
        setTimeout(() => {
            // Focus method only works after a setTimeout.
            this.firstInput.nativeElement.focus();

            // We need to wait one tick of the VM so 'args' gets populated
            // and then we can know if we are in edit-mode.
            this.initEditOrderForm();
        });
    }

    addOrder() {
        const clientId = this.args.clientId;
        const orderToAdd = Object.assign({}, this.orderForm.value, { clientId })
        this.dataService.orders.add(orderToAdd).subscribe(addedOrder => {
            this.close(addedOrder);
        });
    }

    editOrder() {
        const newOrder = Object.assign({}, this.args.order, this.orderForm.value);
        this.dataService.orders.edit(newOrder).subscribe(editedClient => {
            this.close(editedClient);
        });
    }

    private initEditOrderForm() {
        if (this.isEditMode) {
            this.orderForm.reset({
                description: this.args.order.description
            });
            this.orderForm.setValidators(this.formIsEditedValidator.bind(this));
            this.orderForm.updateValueAndValidity();
        }
    }

    // Checks that the form's value changes from its starting state.
    private formIsEditedValidator(group: FormGroup) {
        if (group.value.description === this.args.order.description) {
            return { noChange: true };
        }
        return null;
    }
}
