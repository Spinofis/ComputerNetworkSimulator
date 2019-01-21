import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base-service";

@Injectable()
export class TestService extends BaseService {
  public testPost() {
   return this.post("/TestFeature/TestPost", { id: 1, name: "dupa" });
  }
}
