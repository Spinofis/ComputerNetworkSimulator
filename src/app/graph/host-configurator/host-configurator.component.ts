import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Node } from "../shared/model/d3/node";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { validateHostIdentity } from "../shared/validators/validate-host-config";
import { hasControlErrors } from "../shared/validators/validate-form-group";

@Component({
  selector: "app-host-configurator",
  templateUrl: "./host-configurator.component.html",
  styleUrls: ["./host-configurator.component.scss"]
})
export class HostConfigurator implements OnInit {
  submitted: boolean = false;
  configurationForm: FormGroup;
  node: Node;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.loadForm();
  }

  buildForm() {
    this.configurationForm = this.fb.group({
      HostIdentity: ["", [validateHostIdentity, Validators.required]]
    });
  }

  public setNode(node: Node) {
    this.node = node;
  }

  loadForm() {
    if (this.node) {
      this.f["HostIdentity"].setValue(this.node.hostIdentity);
    }
  }

  get f() {
    return this.configurationForm.controls;
  }

  save() {
    this.submitted = true;
    if (this.node && !hasControlErrors(this.configurationForm)) {
      this.node.hostIdentity = this.f["HostIdentity"].value;
      this.activeModal.close();
    }
  }

  btnCancel_Click(e) {
    this.activeModal.close();
  }
}
