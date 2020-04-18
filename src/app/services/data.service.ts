import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {

  public blogURL = '../../assets/data/blogData.json';
  public user: Observable<firebase.User>;

  constructor(
    private firestoreService: AngularFirestore,
    private httpClient: HttpClient,
    private angularFireAuth: AngularFireAuth
  ) {
    this.user = angularFireAuth.authState;
  }

  ngOnInit() {}

  getBlogData() {
    return this.httpClient
      .get<any>(this.blogURL, {
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

  addUserInfo(
    id: string,
    name: string,
    contact: string,
    email: string,
    address: string
  ) {
    return this.firestoreService
      .doc('contactUsers/' + id)
      .set({ name, contact, email, address });
  }

  login(email, password) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.angularFireAuth.signOut();
  }

}
