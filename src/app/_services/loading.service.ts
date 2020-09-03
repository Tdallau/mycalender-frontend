import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = false;
  public $isLoading = new BehaviorSubject<boolean>(this.isLoading);

  setloading(loading: boolean) {
    this.isLoading = loading;
    this.$isLoading.next(loading);
  }
}