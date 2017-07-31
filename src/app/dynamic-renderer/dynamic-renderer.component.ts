import {
    Component, Input, ViewChild, Renderer2, ViewContainerRef, ComponentFactoryResolver, ComponentFactory,
    ComponentRef
} from '@angular/core';
import { DomLoaderService } from './dom-loader.service';
import { IDomNode } from '../dom-node.model';
import { DynamicComponent } from '../dynamic-component/dynamic-component.component';


/**
 * Компонент, реализующий динамичесое создание дочерних компонентов
 * на базе полученной DOM-модели
 */
@Component({
    selector: 'dynamic-renderer',
    templateUrl: './dynamic-renderer.component.html'
})
export class DynamicRendererComponent {
    @Input() url: string;   // Url модели DOM
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;    // Указатель на контейнер для загрузки
    private dynamicComponentRef: ComponentRef<DynamicComponent>;    // Указатель на вновь созданный компонент


    /**
     * Конструктор
     * @param resolver {ComponentFactoryResolver} - ComponentFactoryResolver injector
     * @param renderer {Renderer2} - Renderer2 injector
     * @param loader {DomLoaderService} - DomLoaderService injector
     */
    constructor (private resolver: ComponentFactoryResolver,
                 private renderer: Renderer2,
                 private loader: DomLoaderService) {};


    /**
     * Получение модели DOM с удаленного сервера,
     * построение шаблона на основе полученной модели DOM,
     * создание динамического компонента DynamicComponent и внедрение его в родительский компонент
     */
    generate(): void {
        this.loader.fetchNodes(this.url).subscribe((result: any) => {
            const root = this.renderNodes(result);
            const factory: ComponentFactory<DynamicComponent> = this.resolver.resolveComponentFactory(DynamicComponent);
            this.dynamicComponentRef = this.container.createComponent(factory);
            this.dynamicComponentRef.instance.view.element.nativeElement.children[0].children[0].appendChild(root);
        });
    };


    /**
     * Рекурсивное построение дерева DOM на основе модели
     * @param json {IDomNode} - модель DOM
     * @param root {any|undefined} - родительский узел DOM, в который будет вставлено полученное дерево элементов DOM
     * @returns {any} - корневой DOM элемент
     */
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
        // Если у элемента имееются дочерние элементы - они рекурсивно обрабатываются
        if (json['content']) {
            json.content.forEach((value: IDomNode, index: number, array: IDomNode[]) => {
                this.renderNodes(value, node);
            });
        }
        return node;
    };
};
