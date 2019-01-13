import {
  Component,
  Input,
  ChangeDetectorRef,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { D3Service, ForceDirectedGraph, Node, Link } from "../../d3";
import { GraphEditMode } from "src/app/shared/enums/graph-edit-mode";
import { GraphService } from "../shared/services/graph-service";

@Component({
  selector: "graph",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.scss"]
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input("nodes") nodes: Node[];
  @Input("links") links: Link[];
  public graph: ForceDirectedGraph;
  private _options: { width; height } = { width: 800, height: 600 };
  graphEditMode: GraphEditMode = GraphEditMode.none;
  clickedNode1: Node;
  clickedNode2: Node;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(
    private d3Service: D3Service,
    private graphService: GraphService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.graph = this.d3Service.getForceDirectedGraph(
      this.nodes,
      this.links,
      this.options
    );

    this.graph.ticker.subscribe(d => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return (this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  public recreateLinks() {
    this.graph.initLinks();
  }

  // public stopSimulation() {
  //   // this.graph.simulation.stop();
  // }

  // public restartSimulation() {
  //   this.graph = this.d3Service.getForceDirectedGraph(
  //     this.nodes,
  //     this.links,
  //     this.options
  //   );

  //   this.graph.ticker.subscribe(d => {
  //     this.ref.markForCheck();
  //   });

  //   this.graph.initSimulation(this.options);
  // }

  onNodeClicked(e) {}

}
