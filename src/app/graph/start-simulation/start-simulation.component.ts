import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { PcNode } from "../shared/model/d3/pc-node";
import { NetworkSimulation } from "../shared/model/network/network-simulation";
import { ValidatorService } from "../shared/services/validator-service";

@Component({
  selector: "app-start-simulation",
  templateUrl: "./start-simulation.component.html",
  styleUrls: ["./start-simulation.component.scss"]
})
export class StartSimulationComponent implements OnInit {
  startSimulationForm: FormGroup;
  pcNodes: PcNode[] = [];
  submitted: boolean = false;
  selectedtHostFrom: any;
  selectedtHostTo: any;
  networkSimulation: NetworkSimulation;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.startSimulationForm = this.fb.group({
      hostFromControl: [null, Validators.required],
      hostToControl: [null, Validators.required]
    });
  }

  initWindow(pcNodes: PcNode[]) {
    this.pcNodes = pcNodes;
    this.networkSimulation = new NetworkSimulation();
  }

  btnCancel_Click(e) {
    this.activeModal.close();
  }

  get f() {
    return this.startSimulationForm.controls;
  }

  start() {
    if (!this.f["hostFromControl"].valid || !this.f["hostToControl"].valid) {
      alert("Podaj host startowy i końcowy");
    } else {
      this.networkSimulation.nodeFrom = this.f["hostFromControl"].value;
      this.networkSimulation.nodeTo = this.f["hostToControl"].value;
      this.activeModal.close(this.networkSimulation);
    }
  }
}
