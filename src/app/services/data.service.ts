import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public imageURL = '../../assets/jsonData/sliderData.json';

  constructor(private firestoreService: AngularFirestore) {}

  addUserInfo(id: string, name: string, contact: string, email:string, address:string) {
    return this.firestoreService.doc('users/' + id).set({ name, contact, email, address });
  }
}
