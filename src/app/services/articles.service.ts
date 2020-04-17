import { Injectable, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private _snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public dataSnackBar: any
  ) {}
  addBlogDetails(
    category: string,
    title: string,
    author_name: string,
    date: Date,
    description: string,
    tags: string,
    image: File
  ) {
    return new Promise((resolve, reject) => {
      let ref = this.fireStorage.ref('/blogs/' + image.name);
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe((imgUrl) => {
          this.firestore
            .collection(`blogs`)
            .add({
              category,
              title,
              author_name,
              date,
              description,
              tags,
              imgUrl,
            })
            .then(() =>
              resolve(
                this._snackBar.open(
                  'Blog successfuly uploaded !',
                  null,
                  this.dataSnackBar.duration
                )
              )
            )
            .catch(() =>
              reject(
                this._snackBar.open(
                  'Oops! can not add this product, someting is wrong!',
                  null,
                  this.dataSnackBar.duration
                )
              )
            );
        });
      });
    });
  }
}
