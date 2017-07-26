import { Injectable } from '@angular/core';
import { Http, ResponseOptions, Response } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';


@Injectable()
export class DomLoaderService {

    private data = {
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

    constructor(private http: Http, private backend: MockBackend) {
        this.backend.connections.subscribe( (c: MockConnection) => {
            if (c.request.url === 'http://get-dom-model.com') {
                let res = new Response(new ResponseOptions({
                    body: this.data,
                    status: 200
                }));
                c.mockRespond(res);
            }
        });
    };


    fetchNodes(): any {
        return this.http.get('http://get-dom-model.com')
            .map((response: Response) => {

                return response['_body'];
            })
            .take(1);
    };

};
