import { Component, AfterViewInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  productObservable: Subscription
  mArticles:any;
  //products: Array<Product> = []
  constructor(private dataService:DataService, private articleService:ArticlesService) { }

  ngAfterViewInit(): void {
    this.productObservable = this.articleService.getAllBlogs().subscribe(data => {
      this.mArticles = data.map(element => {
        return {
          id: element.payload.doc.id,
          categoty: element.payload.doc.data()['category'], // or: ...element.payload.doc.data()
          title: element.payload.doc.data()['title'],
          author_name: element.payload.doc.data()['author_name'],
          date: element.payload.doc.data()['date'],
          description: element.payload.doc.data()['description'],
          tags: element.payload.doc.data()['tags'],
          imgUrl: element.payload.doc.data()['imgUrl']
        }
      })
    })
  }










  //   this.dataService
  //     .getBlogData()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe((res: HttpResponse<any>) => {
  //       this.mArticles = res.body;
  //   });
  // }
}
