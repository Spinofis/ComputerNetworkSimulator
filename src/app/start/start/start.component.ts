import { Component, OnInit } from "@angular/core";
import { TestService } from "../test-service";

@Component({
  selector: "app-start",
  templateUrl: "./start.component.html",
  styleUrls: ["./start.component.scss"]
})
export class StartComponent implements OnInit {
  constructor(private testService: TestService) {}

  ngOnInit() {
    this.testService.testPost().subscribe();
  }
}
