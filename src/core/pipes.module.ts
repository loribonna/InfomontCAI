import { NgModule } from '@angular/core';
import { TitleCasePipe } from './pipes/titlecase.pipe';


const PIPES = [
    TitleCasePipe
];

@NgModule({
    declarations: PIPES,
    exports: PIPES
})
export class PipesModule { }

