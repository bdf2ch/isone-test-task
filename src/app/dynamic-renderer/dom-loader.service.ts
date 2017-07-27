import { Injectable } from '@angular/core';
import { Http, ResponseOptions, Response } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';


/**
 * Сервис получения данных с удаленного сервера.
 * Реализует заглушку для имитации подключения к серверу.
 */
@Injectable()
export class DomLoaderService {

    private data = {    // Модель DOM
        'tag': 'div',
        'content': [
            {
                'tag': 'span',
                'attributes': {
                    'style': 'color: red'
                },
                'content': [
                    { 'text': 'Enter value:' }
                ]
            },
            {
                'tag': 'input',
                'attributes': {
                    'type': 'text',
                    'value': 'test',
                    'style': 'color: green'
                }
            },
            {
                'tag': 'button',
                'attributes': {
                    'type': 'button',
                    'style': 'border: 1px solid red; margin-left: 20px;'
                },
                'content': [
                    {
                        'text': 'click me'
                    }
                ]
            }
        ]
    };


    /**
     * Конструктор.
     * Подготовка заглушки для получения данных с тестового сервера.
     * @param http {Http} - Http injector
     * @param backend {MockBacken} - MockBackend injector
     */
    constructor(private http: Http, private backend: MockBackend) {
        // Подписка на http запрос по http://get-dom-model.com
        this.backend.connections.subscribe( (c: MockConnection) => {
            if (c.request.url === 'http://get-dom-model.com') {
                let res = new Response(new ResponseOptions({
                    body: this.data,    // Набор тестовых данных
                    status: 200         // Соединение успешно завершено
                }));
                c.mockRespond(res);
            }
        });
    };


    /**
     * Запрос на получение модели DOM с сервера с заданным url
     * @param url {String} - url модели DOM
     * @returns {Observable<R>}
     */
    fetchNodes(url: string): any {
        return this.http.get(url)
            .map((response: Response) => {
                return response['_body'];
            })
            .take(1)
            .catch(this.handleError);
    };


    /**
     * Обработчик ошибок при обращении к серверу
     * @param error {Response|any} - ответ сервера либо текст ошибки
     * @returns {any}
     */
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    };

};
