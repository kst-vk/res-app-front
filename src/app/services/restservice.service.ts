import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArrayEnvelope } from '../data/array-envelope.model';

@Injectable({
  providedIn: 'root'
})
export class RESTService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  sortArray(url: string, order: string, array: Number[]) {
    return this.http.post<ArrayEnvelope>(url, { array: array, order: order }, this.httpOptions);
  }
    
}
