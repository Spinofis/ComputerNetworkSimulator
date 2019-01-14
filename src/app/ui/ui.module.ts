import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { GraphMenu } from "./graph-menu/graph-menu.component";

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, GraphMenu],
  imports: [CommonModule],
  exports: [LayoutComponent, GraphMenu]
})
export class UiModule {}
