import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  public blogURL = '../../assets/data/blogData.json';

  constructor(private firestoreService: AngularFirestore, private httpClient:HttpClient) {}

  ngOnInit() {}

  getBlogData(){
    return this.httpClient
    .get<any>(this.blogURL, {
      params: new HttpParams({ }),
      observe: "response"
    })
    .pipe(
      retry(3),
      catchError(this.handleError),
      tap(res => {
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknow error!;";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error :${error.error.message}`;
    } else {
      errorMessage = `Error : ${error.status} \nMessage :${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  addUserInfo(
    id: string,
    name: string,
    contact: string,
    email: string,
    address: string
  ) {
    return this.firestoreService
      .doc('users/' + id)
      .set({ name, contact, email, address });
  }
}
