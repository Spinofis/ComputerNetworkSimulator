import { GraphEditMode } from 'src/app/shared/enums/graph-edit-mode';

export class GraphEditParams{
    graphEditMode:GraphEditMode=GraphEditMode.none;
    clickedNode1:Node;
    clickNode2:Node;
}