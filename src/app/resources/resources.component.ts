import { Component, OnInit } from '@angular/core';
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
  title = "All";
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.getPosts().subscribe(r => {
      this.initialPosts = r;
    })
    this.currentUrl= "https://anapioficeandfire.com/api";
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
}
