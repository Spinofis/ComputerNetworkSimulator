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
  protected baseUrl: string = "https://localhost:44372/api";

  constructor(private http: HttpClient) {}

  protected post(url: string, body: any): Observable<any> {
    const postOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    };
    return this.http.post(this.baseUrl + url, body, postOptions);
  }

  protected get(url: string, httpParams: HttpParams = null): Observable<any> {
    const options = httpParams ? { params: httpParams } : {};
    return this.http.get(this.baseUrl + url, options);
  }
}
