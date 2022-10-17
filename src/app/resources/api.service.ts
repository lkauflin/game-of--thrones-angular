import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private url = 'https://anapioficeandfire.com/api';
   
  constructor(private httpClient: HttpClient) { }
  
  getPosts(){
    return this.httpClient.get(this.url);
  }

  public getNewPosts(newUrl: string){
    return this.httpClient.get(newUrl);
  }
}
