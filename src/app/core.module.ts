import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LocalStorageService } from './core/local-storage.service';
import { DataService } from './core/data.service';

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: [
        LocalStorageService,
        DataService,
    ]
})
export class CoreModule {
    // This guards against the CoreModule from being imported into any
    // module except the root-module (AppModule).
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}
