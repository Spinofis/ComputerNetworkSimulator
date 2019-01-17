import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PcNode } from "../shared/model/d3/pc-node";

@Component({
  selector: "app-start-simulation",
  templateUrl: "./start-simulation.component.html",
  styleUrls: ["./start-simulation.component.scss"]
})
export class StartSimulationComponent implements OnInit {
  startSimulationForm: FormGroup;
  pcNodes: PcNode[] = [];

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.startSimulationForm = this.fb.group({
      hostControl: []
    });
  }

  setPcNodes(pcNodes: PcNode[]) {
    this.pcNodes = pcNodes;
  }

  // countries = [
  //   {
  //     id: "8f8c6e98",
  //     name: "USA",
  //     code: "USD"
  //   },
  //   {
  //     id: "169fee1a",
  //     name: "Canada",
  //     code: "CAD"
  //   },
  //   {
  //     id: "3953154c",
  //     name: "UK",
  //     code: "GBP"
  //   }
  // ];

  btnCancel_Click(e) {
    this.activeModal.close();
  }

  start() {
    console.log("start symulacja");
  }
}
