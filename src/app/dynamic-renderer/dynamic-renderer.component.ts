import { Component, Input, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { InsertHereDirective } from './insert-here.directive';
import { DomLoaderService } from './dom-loader.service';
import {IDomNode, IDomNodeAttribute} from '../dom-node.model';


@Component({
    templateUrl: './dynamic-renderer.component.html'
})
export class DynamicRendererComponent implements OnInit {
    @Input() url: string;
    @ViewChild(InsertHereDirective) container: InsertHereDirective;
    source: IDomNode;

    constructor (private renderer: Renderer2,
                 private loader: DomLoaderService) {};


    ngOnInit(): void {
        this.source = this.loader.fetchNodes();
        console.log(this.source);
        this.render(this.source);
    };




    render(rootNode: IDomNode): void {
        let root = this.renderer.createElement(rootNode.tag);
        rootNode.content.map((node: IDomNode) => {
            let child = this.renderer.createElement(node.tag);
            for (let attr in node.attributes) {
                console.log(attr);
                this.renderer.setAttribute(child, attr, node.attributes[attr]);
            }
            this.renderer.appendChild(root, child);
        });
        console.log(root);
    };
};
