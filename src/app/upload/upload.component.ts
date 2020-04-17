import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public errorMsg:string;
  @ViewChild('image') image: ElementRef

  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {}

  addNewBlog(form:NgForm){
    let articleCategory = form.value.articleCategory,
      articleTitle = form.value.title,
      author_name = form.value.author_name,
      date = form.value.date,
      description = form.value.description,
      tags = form.value.tags,
      img = (<HTMLInputElement>this.image.nativeElement).files[0];

    this.articleService
      .addBlogDetails(
        articleCategory,
        articleTitle,
        author_name,
        date,
        description,
        tags,
        img
      ).then(msg => console.log(msg))
      .catch(err => console.log(err))
  }

}
