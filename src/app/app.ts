import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { Header } from './layout/header/header';
import { SideBar } from './layout/side-bar/side-bar';

@Component({
  selector: 'app-root',
  imports: [MatSidenavModule, RouterOutlet, MatListModule, Header, RouterModule, SideBar],
  template: `
    <main>
      <app-header />
      <div class="app-container">
        <div class="side-bar">
          <app-side-bar />
        </div>
        <div class="content">
          <router-outlet />
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .app-container {
        height: calc(100vh - 120px);
        display: flex;
        max-width: 1440px;
        margin: 0 auto;
        padding: 0;
        width: 100%;
        overflow: hidden;
      }

      .content {
        display: flex;
        justify-content: center;
        flex: 1;
        overflow-y: auto;
      }
    `,
  ],
})
export class App {}
