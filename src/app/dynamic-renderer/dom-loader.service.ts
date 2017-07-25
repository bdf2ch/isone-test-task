import { Injectable } from '@angular/core';
import { Http, ResponseOptions, Response } from '@angular/http';
import { MockConnection, MockBackend } from '@angular/http/testing';


@Injectable()
export class DomLoaderService {
    private backend: MockBackend = new MockBackend;

    constructor(private http: Http) {};

    fetchNodes(): any {
        /*
        this.backend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(new ResponseOptions({ body: 'fake response' })));
        });
        this.http.request('').subscribe();
        */
        return {
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
                { 'tag': 'input',
                    'attributes': {
                        'type': 'text',
                        'value': 'test',
                        'style': 'color: green'
                    }
                }
            ]
        };
    }
};
