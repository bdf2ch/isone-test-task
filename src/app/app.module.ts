import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DynamicRendererComponent } from './dynamic-renderer/dynamic-renderer.component';
import { InsertHereDirective } from './dynamic-renderer/insert-here.directive';
import { DomLoaderService } from './dynamic-renderer/dom-loader.service';


const routes: Routes = [
  {
    path: '',
    component: DynamicRendererComponent,
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    DynamicRendererComponent,
    InsertHereDirective
  ],
  providers: [ DomLoaderService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
