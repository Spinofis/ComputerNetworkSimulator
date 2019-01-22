import { Injectable } from "@angular/core";
import { BaseService } from "../shared/base-service";

@Injectable()
export class TestService extends BaseService {
  public testPost() {
    let fathers: Father[] = [];

    fathers.push({
      kid1: {
        kid1: "kid1"
      },
      kid2: {
        kid2: "kid2"
      }
    });
    return this.post("/TestFeature/TestPost", fathers);
  }
}

export class Father {
  public kid1: Kid1;
  public kid2: Kid2;
}

export class Kid1 {
  public kid1: string;
}

export class Kid2 {
  public kid2: string;
}
