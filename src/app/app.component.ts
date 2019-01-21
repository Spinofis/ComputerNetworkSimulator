import { Component, ViewChild } from "@angular/core";
import { GraphComponent } from "./graph/graph/graph.component";
import { Link } from "./graph/shared/model/d3/link";
import { Node } from "./graph/shared/model/d3/node";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "body",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  @ViewChild("graph")
  graph: GraphComponent;

  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
