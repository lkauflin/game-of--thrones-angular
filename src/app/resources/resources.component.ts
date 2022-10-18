import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';
import { ApiService } from './api.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  posts: Array<object> = [];
  initialPosts: object | undefined
  lastUrl: string | undefined;
  currentUrl: string | undefined;
  typeArray = false;
  title = "An API of Ice And Fire";
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.getPosts().subscribe(r => {
      this.initialPosts = r;
    })
    this.currentUrl = "https://anapioficeandfire.com/api";
  }


  changeUrl(url: any) {
    if ("string" === typeof url) {
      this.lastUrl = this.currentUrl;
      this.currentUrl = url;
      let array = url.split("/");
      this.title = array[array.length - 1];
      this.service.getNewPosts(url).subscribe(r => {
        if (Array.isArray(r)) {
          this.posts = r;
          this.initialPosts = undefined;
        } else {
          this.posts = [];
          this.initialPosts = r;
        }
      }
      );
    }
  }

  isUrl(param: string) {
    if (param && typeof param === 'string') {
      return param.includes('https');
    }
    return false;
  }
  isArray(param: string | Array<string>): boolean {
    if (Array.isArray(param)) {
      console.log(param)
      return true;
    }
    else return false;
  }
  getLastPartOfUrl(url: string) {
    let urlArray = url.split("/");
    return urlArray[urlArray.length - 1];
  }
}
