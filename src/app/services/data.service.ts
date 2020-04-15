import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public imageURL = '../../assets/jsonData/sliderData.json';

  constructor(private httpClient: HttpClient) {}

  getImageData() {
    return this.httpClient
      .get<any>(this.imageURL, {
        params: new HttpParams({}),
        observe: 'response',
      })
      .pipe(
        retry(3),
        catchError(this.handleError),
        tap((res) => {})
      );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknow error!;';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error :${error.error.message}`;
    } else {
      errorMessage = `Error : ${error.status} \nMessage :${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
