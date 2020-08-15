import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Host} from "../config";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient,
              private http: HttpClient,) {
  }

  pay(data) {
    return new Promise((resolve, reject) => {
      this.http.post(Host + 'pay', data).subscribe((response: any) => {
          resolve(response);
        },
        error => {
          reject(error);
        });
    })

  }

}
