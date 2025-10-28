import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { APP_ROUTES } from './core/constants/routes.constants';
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
  styles: [
    `
      .app-container {
        display: flex;
      }
      .side-bar {
        width: 200px;
      }
      .content {
        flex: 1;
      }
    `,
  ],
})
export class App {
  protected readonly routes = Object.values(APP_ROUTES);
}
