import { Component, AfterViewInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements AfterViewInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  mArticles:any;
  constructor(private dataService:DataService) { }

  ngAfterViewInit(): void {
    this.dataService
      .getBlogData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        this.mArticles = res.body;
    });
  }
}
