import { Input } from '@angular/core';


export abstract class NodeVisualComponent  {
  @Input("nodeVisual") node: Node;
  
}
