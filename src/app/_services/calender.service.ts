import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Calender } from '../_models/calender';
import { ResponseList, ResponseItem } from '../_models/responseType';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  private baseUrl = 'https://mycalender.dallau.com/api/calender/';
  constructor(private http: HttpClient) { }
  getAllCalenders(): Observable<Array<Calender>> {
    return this.http.get<ResponseItem<Array<Calender>>>(`${this.baseUrl}`).pipe(
      map(result => {
        if(result.success) {
          return result.data
        }
        return [];
      })
    )
  }
}
