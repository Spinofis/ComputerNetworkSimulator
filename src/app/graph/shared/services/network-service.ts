import { Injectable } from "@angular/core";
import { PcNode } from "../model/d3/pc-node";
import { RouterNode } from "../model/d3/router-node";
import { Node } from "../model/d3/node";
import { SimulationPath } from "../model/network/simulation-path";
import { ForceDirectedGraph } from "../model/d3/force-directed-graph";
import { SwitchNode } from "../model/d3/switch-node";
import { GraphApiService } from "./graph-api-service";

@Injectable()
export class NetworkService {
  private allSimulationPaths: SimulationPath[] = [];
  private correctSimulationPaths: SimulationPath[] = [];
  private simulationPath: SimulationPath;
  private visitedNodes: Node[];
  private graph: ForceDirectedGraph;
  private index: number = 0;

  constructor(private apiService: GraphApiService) {}

  public startSimulation(
    startNode: Node,
    endNode: Node,
    nodes: Node[],
    graph: ForceDirectedGraph
  ) {
    if (!startNode || !endNode || !nodes)
      throw new Error("Introduced parameters of simulation are invalid");

    this.graph = graph;
    this.visitedNodes = [];
    let pathNodes: Node[] = [];
    this.allSimulationPaths = [];
    this.correctSimulationPaths = [];
    this.dfs(startNode, endNode, nodes, pathNodes);
    // this.simulationPath = this.getCorrectSimulationPathFromAll(
    //   this.allSimulationPaths
    // );

    this.setBaseSateToAllNodes(nodes);
    this.setCorrectSimulationPath(this.allSimulationPaths);
    // if (this.isPathInOneNetwork(this.simulationPath))
    //   this.simulationPath = this.corigatePath(this.simulationPath);
    this.goFormNodeToNode();
  }

  private dfs(
    startNode: Node,
    endNode: Node,
    nodes: Node[],
    pathNodes: Node[]
  ) {
    if (startNode.id == endNode.id) {
      pathNodes.push(endNode);
      let newSimulationPath: SimulationPath = new SimulationPath();
      newSimulationPath.nodes = [];
      pathNodes.forEach(element => {
        newSimulationPath.nodes.push(element);
      });
      this.allSimulationPaths.push(newSimulationPath);
      pathNodes.splice(pathNodes.indexOf(endNode), 1);
      return;
    }

    this.visitedNodes.push(startNode);

    startNode.connectedNodes.forEach(element => {
      pathNodes.push(startNode);
      if (!this.visitedNodes.find(x => x == element)) {
        this.dfs(nodes.find(x => x == element), endNode, nodes, pathNodes);
      }
      pathNodes.splice(pathNodes.indexOf(startNode), 1);
    });

    this.visitedNodes.splice(this.visitedNodes.indexOf(startNode), 1);
  }

  //correct that means, taht there is no pc node in path between start and end node

  private setCorrectSimulationPath(allPaths: SimulationPath[]): SimulationPath {
    if (!allPaths) throw new Error("Incorrect parameter allPaths");

    let correctPath: SimulationPath = null;

    allPaths.forEach(element => {
      if (this.isPathFromNodeToNodeCorect(element)) {
        this.correctSimulationPaths.push(element);
      }
    });
    return correctPath;
  }

  private isPathFromNodeToNodeCorect(simulationPath: SimulationPath): boolean {
    if (!simulationPath) throw new Error("Incorrect parameter simulationPath");

    let indexStart: number = 0;
    let indexEnd: number = simulationPath.nodes.length - 1;
    let currentIndex: number = indexStart;

    simulationPath.nodes.forEach(element => {
      if (currentIndex != indexStart && currentIndex != indexEnd) {
        if (element instanceof PcNode) return false;
      }
      currentIndex++;
    });

    return true;
  }

  private goFormNodeToNode() {
    this.index == 0;
    for (var i = 0; i < this.correctSimulationPaths.length; i++) {
      let path = this.correctSimulationPaths[i];
      this.index == 0;
      this.pingHosts(0, path.nodes);
      if (this.index == path.nodes.length) {
        break;
      }
    }
  }

  pingHosts(index: number, nodes: Node[]) {
    setTimeout(() => {
      var isAvaiable = this.apiService.pingHost(nodes[index].hostIdentity);
      if (isAvaiable == "true") {
        nodes[index].setCorrect();
      } else {
        nodes[index].setInvalid();
        alert("Host" + nodes[index].getName() + " jest niedostępny");
      }
      index++;
      this.graph.simulation.restart();
      if (index >= nodes.length) {
        this.index = index;
        return;
      } else this.pingHosts(index, nodes);
    }, 100);
  }

  private setBaseSateToAllNodes(nodes: Node[]) {
    nodes.forEach(element => {
      element.setNoneSimulationSate();
    });
    this.graph.simulation.restart();
  }

  private isPathInOneNetwork(path: SimulationPath): boolean {
    let is: boolean = true;
    path.nodes.forEach(element => {
      if (element instanceof RouterNode) is = false;
    });

    return is;
  }

  private corigatePath(path: SimulationPath): SimulationPath {
    let newPath = new SimulationPath();
    newPath.nodes = [];
    path.nodes.forEach(element1 => {
      newPath.nodes.push(element1);
      if (element1 instanceof SwitchNode) {
        element1.connectedNodes.forEach(element2 => {
          if (element2 instanceof RouterNode) {
            newPath.nodes.push(element2);
          }
        });
      }
    });
    return newPath;
  }
}
