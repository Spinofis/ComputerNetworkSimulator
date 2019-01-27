import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Node } from "../shared/model/d3/node";
import { ValidatorService } from "../shared/services/validator-service";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-host-configurator",
  templateUrl: "./host-configurator.component.html",
  styleUrls: ["./host-configurator.component.scss"]
})
export class HostConfigurator implements OnInit {
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
      // Mask: [
      //   "",
      //   [
      //     Validators.pattern(this.validatorService.getIpPattern()),
      //     Validators.required
      //   ]
      // ],
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
    // if (this.node) {
    //   let pcConfig: PcConfiguration = this.node.getConfiguration();
    //   if (pcConfig) {
    //     this.f["Ip"].setValue(pcConfig.ip);
    //     // this.f["Mask"].setValue(pcConfig.mask);
    //     this.f["Gateway"].setValue(pcConfig.gateway);
    //   }
    // }
  }

  get f() {
    return this.configurationForm.controls;
  }

  save() {
    // this.submitted = true;
    // if (
    //   this.node &&
    //   !this.validatorService.hasControlErrors(this.configurationForm)
    // ) {
    //   let pcConfiguration: PcConfiguration = new PcConfiguration();
    //   pcConfiguration.ip = this.f["Ip"].value;
    //   // pcConfiguration.mask = this.f["Mask"].value;
    //   pcConfiguration.gateway = this.f["Gateway"].value;
    //   this.node.setConfiguration(pcConfiguration);
    //   this.activeModal.close();
    // }
  }

  btnCancel_Click(e) {
    this.activeModal.close();
  }
}
