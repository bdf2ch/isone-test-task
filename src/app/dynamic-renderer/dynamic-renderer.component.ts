import {
    Component, Input, ViewChild, Renderer2, ViewContainerRef, ComponentFactoryResolver, ComponentFactory,
    ComponentRef
} from '@angular/core';
import { DomLoaderService } from './dom-loader.service';
import { IDomNode } from '../dom-node.model';
import { DynamicComponent } from '../dynamic-component/dynamic-component.component';


@Component({
    templateUrl: './dynamic-renderer.component.html'
})
export class DynamicRendererComponent {
    @Input() url: string;
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) container: ViewContainerRef;
    private dynamicComponentRef: ComponentRef<DynamicComponent>;


    constructor (private resolver: ComponentFactoryResolver,
                 private renderer: Renderer2,
                 private loader: DomLoaderService) {};


    generate(): void {
        this.loader.fetchNodes().subscribe((result: any) => {
            const root = this.renderNodes(result);
            const factory: ComponentFactory<DynamicComponent> = this.resolver.resolveComponentFactory(DynamicComponent);
            this.dynamicComponentRef = this.container.createComponent(factory);
            this.dynamicComponentRef.instance.view.element.nativeElement.children[0].children[0].appendChild(root);
        });
    };



    renderNodes(json: IDomNode, root?: any | undefined): any {
        let node = json['tag'] ? this.renderer.createElement(json.tag) : this.renderer.createText(json.text);
        if (!json['text'] && json['attributes']) {
            for (let attr in json.attributes) {
                this.renderer.setAttribute(node, attr, json.attributes[attr]);
            }
        }
        if (root) {
            this.renderer.appendChild(root, node);
        }
        if (json['content']) {
            json.content.forEach((value: IDomNode, index: number, array: IDomNode[]) => {
                this.renderNodes(value, node);
            });
        }
        return node;
    };






        //this.container.clear();
        //const factory: ComponentFactory<DynamicComponent> = this.resolver.resolveComponentFactory(DynamicComponent);
        //this.dynamicComponentRef = this.container.createComponent(factory);
        //this.dynamicComponentRef.instance.view.element.nativeElement.children[0].appendChild(root);

};
