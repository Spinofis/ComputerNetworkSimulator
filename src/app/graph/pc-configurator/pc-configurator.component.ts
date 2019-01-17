import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HostConfigurator } from "../shared/interfaces/host-configurator";
import { Node } from "../shared/model/d3/node";
import { PcConfiguration } from "../shared/model/network/pc-configuration";
import { PcNode } from "../shared/model/d3/pc-node";
import { ValidatorService } from "../shared/services/validator-service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-pc-configurator",
  templateUrl: "./pc-configurator.component.html",
  styleUrls: ["./pc-configurator.component.scss"]
})
export class PcConfiguratorComponent implements OnInit, HostConfigurator {
  submitted: boolean = false;
  configurationForm: FormGroup;
  node: Node;

  constructor(
    public activeModal: NgbActiveModal,
    private validatorService: ValidatorService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.loadForm();
  }

  buildForm() {
    this.configurationForm = this.fb.group({
      Ip: [
        "",
        [
          Validators.pattern(this.validatorService.getIpPattern()),
          Validators.required
        ]
      ],
      Mask: [
        "",
        [
          Validators.pattern(this.validatorService.getIpPattern()),
          Validators.required
        ]
      ],
      Gateway: [
        "",
        [
          Validators.pattern(this.validatorService.getIpPattern()),
          Validators.required
        ]
      ]
    });
  }

  public setNode(node: Node) {
    this.node = node;
  }

  loadForm() {
    if (this.node) {
      let pcConfig: PcConfiguration = this.node.getConfiguration();
      if (pcConfig) {
        this.f["Ip"].setValue(pcConfig.ip);
        this.f["Mask"].setValue(pcConfig.mask);
        this.f["Gateway"].setValue(pcConfig.gateway);
      }
    }
  }

  get f() {
    return this.configurationForm.controls;
  }

  save() {
    this.submitted = true;
    if (
      this.node &&
      !this.validatorService.hasControlErrors(this.configurationForm)
    ) {
      let pcConfiguration: PcConfiguration = new PcConfiguration();
      pcConfiguration.ip = this.f["Ip"].value;
      pcConfiguration.mask = this.f["Mask"].value;
      pcConfiguration.gateway = this.f["Gateway"].value;
      this.node.setConfiguration(pcConfiguration);
      this.activeModal.close();
    }
  }

  btnCancel_Click(e) {
    this.activeModal.close();
  }
}
