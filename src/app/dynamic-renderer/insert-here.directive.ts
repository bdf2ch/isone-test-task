import { Directive, ViewContainerRef } from '@angular/core';


@Directive({
    selector: '[insert-here]'
})
export class InsertHereDirective {
    constructor(public view: ViewContainerRef) {};
};
