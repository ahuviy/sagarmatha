import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/data.service';
import { Client } from '../../interfaces/data-model.interface';

@Component({
    selector: 'add-client',
    templateUrl: './add-client.modal.html'
})
export class AddClientModal {
    @ViewChild('firstInput') firstInput: ElementRef;

    args: { client: Client; };
    close: (val?: any) => void;
    get isEditMode() { return this.args && this.args.client; }
    clientForm: FormGroup = this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required]
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
            setTimeout(this.initEditClientForm.bind(this));
        });
    }

    addClient() {
        this.dataService.clients.add(this.clientForm.value).subscribe(addedClient => {
            this.close(addedClient);
        });
    }

    editClient() {
        const newClient = Object.assign({}, this.args.client, this.clientForm.value);
        this.dataService.clients.edit(newClient).subscribe(editedClient => {
            this.close(editedClient);
        });
    }

    private initEditClientForm() {
        if (this.isEditMode) {
            this.clientForm.reset({
                firstName: this.args.client.firstName,
                lastName: this.args.client.lastName
            });
            this.clientForm.setValidators(this.formIsEditedValidator.bind(this));
            this.clientForm.updateValueAndValidity();
        }
    }

    // Checks that the form's value changes from its starting state.
    private formIsEditedValidator(group: FormGroup) {
        if (group.value.firstName === this.args.client.firstName &&
            group.value.lastName === this.args.client.lastName
        ) {
            return { noChange: true };
        }
        return null;
    }
}
