import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StartRoutingModule } from "./start-routing.module";
import { StartComponent } from "./start/start.component";

@NgModule({
  declarations: [StartComponent],
  imports: [StartRoutingModule, CommonModule]
})
export class StartModule {}
