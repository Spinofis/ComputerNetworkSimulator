import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StartRoutingModule } from "./start-routing.module";
import { StartComponent } from "./start/start.component";
import { TestService } from './test-service';

@NgModule({
  declarations: [StartComponent],
  imports: [StartRoutingModule, CommonModule],
  providers:[TestService]
})
export class StartModule {}
