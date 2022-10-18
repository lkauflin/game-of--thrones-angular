import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe( value => this.isAuthenticated = value);
  }


  title = 'Game of Thrones App';

  public isAuthenticated = false;

  public logout(): void {
    this._authService.logout();
  }
}
