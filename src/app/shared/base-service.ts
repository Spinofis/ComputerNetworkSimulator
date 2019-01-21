import { Observable } from "rxjs";
import {
  HttpClient,
  HttpRequest,
  HttpParams,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseService {
  baseUrl: string = "https://localhost:44372/api";

  constructor(private http: HttpClient) {}

  protected post(url: string, body: any): Observable<any> {
    const postOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    };
    return this.http.post(this.baseUrl + url, body, postOptions);
  }
}
