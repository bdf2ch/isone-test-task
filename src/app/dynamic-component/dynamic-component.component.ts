import {Component, ViewContainerRef } from '@angular/core';


/**
 * Динамически создаваекмый компонент
 */
@Component({
    templateUrl: './dynamic-component.component.html',
    styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponent {

    /**
     * Конструктор
     * @param view {ViewContainerRef} - ViewContainerRef injector
     */
    constructor(public view: ViewContainerRef) {};

};
