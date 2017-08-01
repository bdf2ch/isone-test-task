import {
    Component, Input, ViewChild, Renderer2, ViewContainerRef, Compiler, NgModuleRef, NgModule, Injector
} from '@angular/core';
import { DomLoaderService } from './dom-loader.service';
import { IDomNode } from '../dom-node.model';


/**
 * Компонент, реализующий динамичесое создание дочерних компонентов
 * на базе полученной DOM-модели
 */
@Component({
    selector: 'dynamic-renderer',
    templateUrl: './dynamic-renderer.component.html'
})
export class DynamicRendererComponent {
    @Input() url: string;                                                               // Url модели DOM
    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;    // Указатель на контейнер для загрузки


    /**
     * Конструктор
     * private compiler {Compiler} - Compiler injector
     * private module {NgModuleRef<any>} - NgModuleRef injector
     * private injector {Injector} - Injector injector
     * @param renderer {Renderer2} - Renderer2 injector
     * @param loader {DomLoaderService} - DomLoaderService injector
     */
    constructor (private compiler: Compiler,
                 private module: NgModuleRef<any>,
                 private injector: Injector,
                 private renderer: Renderer2,
                 private loader: DomLoaderService) {};


    /**
     * Получение модели DOM с удаленного сервера,
     * построение шаблона на основе полученной модели DOM,
     * создание динамического компонента DynamicComponent и внедрение его в родительский компонент
     */
    generate(): void {
        this.loader.fetchNodes(this.url).subscribe((result: any) => {
            const root = document.createElement('div');
            this.renderNodes(result, root);
            this.renderer.addClass(root.children[0], 'dynamic-component');

            // Создаем динамический компонент с построенным деревом DOM в качестве шаблона
            const dynamicComponent = Component({
                template: root.innerHTML,
                styleUrls: ['../dynamic-component/dynamic-component.component.css']
            })(class DynamicComponent {});

            // Создаем модуль и объявляем в нем вновь созданный компонент
            const dynamicModule = NgModule({
                declarations: [ dynamicComponent ]
            })(class DynamicModule {});

            /**
             * Компилируем созданный модуль и объявленные в нем компоненты,
             * получаем фабрику динамического компонента, создаем динамический компонент
             * и загружаем его в HostView родительского компонента
             */
            this.compiler.compileModuleAndAllComponentsAsync(dynamicModule)
                .then((factories) => {
                    const dynamicComponentFactory = factories.componentFactories[0];
                    const dynamicComponentRef = dynamicComponentFactory.create(this.injector, [], null, this.module);
                    dynamicComponentRef.instance.name = 'dynamicComponent';
                    this.container.insert(dynamicComponentRef.hostView);
                });
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
