import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DynamicRendererComponent } from './dynamic-renderer/dynamic-renderer.component';
import { DomLoaderService } from './dynamic-renderer/dom-loader.service';
import { MockBackend } from '@angular/http/testing';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    DynamicRendererComponent
  ],
  providers: [
    DomLoaderService,
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      deps: [ MockBackend, BaseRequestOptions ],
      useFactory: (backend: MockBackend, options: BaseRequestOptions) => { return new Http(backend, options); }
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
