import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { GraphComponent } from './graph-visuals/graph/graph.component';
import { SHARED_VISUALS } from './graph-visuals';
import { D3_DIRECTIVES, D3Service } from './d3';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
