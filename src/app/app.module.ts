import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import  { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './detail.component';
import { ListComponent } from './list.component';
import { FormComponent} from './form.component';
import { pageNotFoundComponent } from './pagenotfound.component';
import {appStoreProviders} from './store'
import { routes } from './app.routes';
import { ItemService } from './item.service';
import { HttpModule, JsonpModule} from '@angular/http';
import { SearchPipe } from './search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DetailComponent,
    ListComponent,
    pageNotFoundComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [appStoreProviders,ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
