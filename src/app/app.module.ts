import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UiModule } from "./ui/ui.module";
import { BaseService } from "./shared/base-service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UiModule, HttpClientModule],
  providers: [BaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
