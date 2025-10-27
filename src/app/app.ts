import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { APP_ROUTES } from './core/routes.constants';
import { MatButton } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    MatListModule,
    Header,
    MatButton,
    RouterModule,
    TitleCasePipe,
  ],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('yox-angular-task');
  protected readonly routes = Object.values(APP_ROUTES);
}
