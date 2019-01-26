import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-log-window",
  templateUrl: "./log-window.component.html",
  styleUrls: ["./log-window.component.scss"]
})
export class LogWindowComponent implements OnInit {
  private comunicates: string[] = [];
  constructor() {}

  ngOnInit() {
    this.comunicates.push();
  }

  public setValidationResult(validationResult: string[]) {
    if (validationResult.length == 0) {
      this.comunicates.push(
        "Symulacja zakończona pomyślnie "
      );
    } else {
      validationResult.forEach(element => {
        this.comunicates.push(element);
      });
    }
  }
}
