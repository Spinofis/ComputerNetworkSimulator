import {
  Component,
  Input,
  ChangeDetectorRef,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { GraphService } from "../shared/services/graph-service";
import { Link } from "../shared/model/d3/link";
import { ForceDirectedGraph } from "../shared/model/d3/force-directed-graph";
import { Node } from "../shared/model/d3/node";
import { D3Service } from "../shared/services/d3.service";
import { GraphEditMode } from "../shared/enums/graph-edit-mode";
import { PcNode } from "../shared/model/d3/pc-node";
import { RouterNode } from "../shared/model/d3/router-node";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NetworkService } from "../shared/services/network-service";
import { HostConfigurator } from "../shared/interfaces/host-configurator";

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
  clickedNodeCount: number = 0;

  private static nodeId: number = 1;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }

  constructor(
    private d3Service: D3Service,
    private graphService: GraphService,
    private networkService: NetworkService,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.preapreSimulation();
  }

  preapreSimulation() {
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

  onNodeClicked(e) {
    if (this.graphEditMode != GraphEditMode.none) {
      (e as Node).selectNode();
      if (!this.clickedNode1) {
        this.clickedNode1 = e;
        this.clickedNodeCount++;
      } else if (!this.clickedNode2) {
        this.clickedNode2 = e;
        this.clickedNodeCount++;
      }
    }

    switch (this.graphEditMode) {
      case GraphEditMode.addLinks: {
        if (this.clickedNodeCount == 2) {
          this.graphService.addLink(
            this.clickedNode1,
            this.clickedNode2,
            this.links
          );
          this.afterGraphEdit();
        }
        break;
      }
      case GraphEditMode.deleteLinks: {
        if (this.clickedNodeCount == 2) {
          this.graphService.deleteLink(
            this.clickedNode1,
            this.clickedNode2,
            this.links
          );
          this.afterGraphEdit();
        }
        break;
      }
      case GraphEditMode.deleteNodes: {
        this.graphService.deleteNode(this.clickedNode1, this.links, this.nodes);
        this.afterGraphEdit();
        break;
      }
      // case GraphEditMode.addNode: {
      //   // this.graphService.addNode(this.clickedNode1, this.nodes);
      //   // this.afterGraphEdit();
      //   break;
      // }
      case GraphEditMode.hostConfiguration: {
        (e as Node).deselectNode();
        this.configurateHost(e);
        this.afterGraphEdit();
        break;
      }
      default: {
        break;
      }
    }
  }

  afterGraphEdit() {
    this.recreateLinks();
    this.deselectEditedNodes();
  }

  deselectEditedNodes() {
    setTimeout(() => {
      if (this.clickedNode1) this.clickedNode1.deselectNode();
      if (this.clickedNode2) this.clickedNode2.deselectNode();
      this.clickedNode1 = null;
      this.clickedNode2 = null;
      this.clickedNodeCount = 0;
    }, 100);
  }

  onGraphEditModeChange(e) {
    this.graphEditMode = e;
  }

  onAddPc(e) {
    debugger;
    this.graph.simulation.stop();
    if (!this.nodes) this.nodes = [];
    let newNodes: Node[] = [];
    this.nodes.forEach(element => {
      newNodes.push(element);
    });
    newNodes.push(new PcNode(GraphComponent.nodeId++));
    this.nodes = [];
    this.restartGraphAfterNodeAdd(newNodes);
  }

  onAddRouter(e) {
    this.graph.simulation.stop();
    if (!this.nodes) this.nodes = [];
    let newNodes: Node[] = [];
    this.nodes.forEach(element => {
      newNodes.push(element);
    });
    newNodes.push(new RouterNode(GraphComponent.nodeId++));
    this.nodes = [];
    this.restartGraphAfterNodeAdd(newNodes);
  }

  private restartGraphAfterNodeAdd(newNodes: Node[]) {
    setTimeout(() => {
      this.nodes = newNodes;
      this.preapreSimulation();
      this.graph.initSimulation(this.options);
    }, 50);
  }

  private configurateHost(node: Node) {
    const modalRef = this.modalService.open(
      this.networkService.getHostConfiguratorWindow(node)
    );
    let connectedNodes: Node[] = this.graphService.getConnectedNodes(
      node,
      this.nodes,
      this.links
    );
    node.setConnectedNodes(connectedNodes);
    (modalRef.componentInstance as HostConfigurator).setNode(node);
  }
}
