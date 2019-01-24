import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { AgGridNg2 } from "ag-grid-angular";
import { GraphApiService } from "../shared/services/graph-api-service";
import { Subject } from "rxjs";
import { Simulation } from "../shared/model/dto/simulation";
import { map, tap, takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-graph-saved-list",
  templateUrl: "./graph-saved-list.component.html",
  styleUrls: ["./graph-saved-list.component.scss"]
})
export class GraphSavedListComponent implements OnInit, OnDestroy {
  @ViewChild("gridSimulations")
  gridSimulations: AgGridNg2;

  subscription = new Subject();
  rowData: Simulation[] = [];

  columnDefs = [
    { headerName: "Id", field: "id", hide: true },
    { headerName: "Data dodania", field: "dateAdd", checkboxSelection: true },
    { headerName: "Date edycji", field: "dateEdit" }
  ];

  constructor(private apiService: GraphApiService, private router: Router) {}

  ngOnInit() {
    this.loadForm();
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

  loadForm() {
    this.apiService
      .getSimulationList()
      .pipe(takeUntil(this.subscription))
      .subscribe(data => {
        this.rowData = data;
      });
  }

  getSelectedRows() {
    const selectedNodes = this.gridSimulations.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    let simulationId: any;
    selectedData.map(node => (simulationId = node.id));
    this.router.navigate(["/graph/graph-edit", simulationId]);
  }
}
