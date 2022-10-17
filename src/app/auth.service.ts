import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public get isAuthenticated$(): Observable<boolean> {
        return this._authSub$.asObservable();
    }

    constructor(private _router: Router) {
        let key = localStorage.getItem('key')
        if (key && key === 'sessionKey') {
            this._authSub$.next(true)
        }
    }

    public ngOnDestroy(): void {
        this._authSub$.next(false);
        this._authSub$.complete();
    }

    public login(username: string, password: string):BehaviorSubject<boolean> {
        this.signInWithCredentials(username, password);
        return this._authSub$;
    }

    public logout(){
        this._authSub$.next(false);
        this._router.navigate(['']);
        localStorage.removeItem('key');
        console.log('logout');
    }


    private signInWithCredentials(username: string, password: string) {
        if (username === "test@gmail.com" && password === "123456") {
            this._authSub$.next(true);
            localStorage.setItem('key', "sessionKey");
            this._router.navigate(['resources']);
        }else{
            this._authSub$.error('wrong');
        }
    }
}