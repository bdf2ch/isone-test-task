import {Component, ViewContainerRef} from '@angular/core';


@Component({
    templateUrl: './dynamic-component.component.html',
    styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponent {

    constructor(public view: ViewContainerRef) {};

};
