import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<div class="container-fluid">
    <app-menu></app-menu>
    <div class="container-fluid mt-2">
      <h1>Welcome</h1>
      <p>This is part of the app.component. Below is the router outlet.</p>
      <hr>
      <router-outlet></router-outlet>
      <div class="authenticating-loader" *ngIf="!(isDoneLoading | async)"><div>Authenticating...</div></div>
      <hr>
      <p>You can <a routerLink="/url-without-route">go to a url without a route</a> to see the fallback route.</p>
      <hr>
      <p>
        <button class="btn btn-success mr-1" (click)='login()'>login</button>
        <button class="btn btn-primary mr-4" (click)='logoff()'>logout</button>
        <button class="btn btn-warning mr-4" (click)='refresh()'>force silent refresh</button>
        <button class="btn btn-secondary mr-4" (click)='reload()'>force reload page</button>
        <button class="btn btn-danger mr-1" (click)='reset()'>reset everything locally</button>
      </p>
      <hr>
      <table class="table table-bordered table-sm table-props">
        <tr><th>IsAuthenticated</th><td><code>{{isAuthenticated | async}}</code></td></tr>
        <tr><th>IsDoneLoading</th><td><code>{{isDoneLoading | async}}</code></td></tr>
        <tr><th>CanActivateProtectedRoutes</th><td><code>{{canActivateProtectedRoutes | async}}</code></td></tr>
        <tr><th>HasValidToken</th><td><code>{{hasValidToken}}</code></td></tr>
        <tr><th>IdentityClaims</th><td class="pre"><code>{{identityClaims | json}}</code></td></tr>
        <tr><th>AccessToken</th><td><code class="break-all">{{accessToken}}</code></td></tr>
        <tr><th>IdToken</th><td><code class="break-all">{{idToken}}</code></td></tr>
      </table>
    </div>
  </div>`,
})
export class AppComponent {
  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;

  constructor (
    private authService: AuthService,
  ) {
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.isDoneLoading = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$;

    this.authService.runInitialLoginSequence();
  }

  login() { this.authService.login(); }
  logoff() { this.authService.logoff(); }
  refresh() { this.authService.refresh(); }
  reload() { window.location.reload(); }

  reset() {
    localStorage.clear();
    this.reload();
  }

  get hasValidToken() { return this.authService.hasValidToken(); }
  get accessToken() { return this.authService.accessToken; }
  get identityClaims() { return this.authService.identityClaims; }
  get idToken() { return this.authService.idToken; }
}
