import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DynamicRendererComponent } from './dynamic-renderer/dynamic-renderer.component';


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
    DynamicRendererComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
