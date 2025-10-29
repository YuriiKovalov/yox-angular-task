import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar">
      <ul>
        @for (item of items(); track item.path) {
          <li>
            <a
              [routerLink]="item.path"
              routerLinkActive="active"
              #rla="routerLinkActive"
              [class.active]="rla.isActive"
            >
              <img [src]="'assets/icons/' + item.icon + '.svg'" [alt]="item.label" class="icon" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [
    `
      .sidebar {
        padding: 40px 50px 0 0;
        width: 220px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      li {
        display: flex;
      }

      a {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 48px;
        width: 100%;
        padding: 0 16px;
        border-radius: 32px;
        font-weight: 500;
        font-size: 16px;
        color: #111;
        text-decoration: none;
        transition:
          background-color 0.2s ease,
          color 0.2s ease;
      }

      a:hover,
      a.active {
        background-color: #00000012;
      }

      .icon {
        width: 24px;
        height: 24px;
        opacity: 0.6;
      }

      a:hover .icon,
      a.active .icon {
        opacity: 1;
      }
    `,
  ],
})
export class SideBar {
  protected readonly items = signal([
    { path: APP_ROUTES.dashboard, label: 'Dashboard', icon: 'dashboard' },
    { path: APP_ROUTES.workplaces, label: 'Workplaces', icon: 'store' },
    { path: APP_ROUTES.requisitions, label: 'Requisitions', icon: 'work' },
    { path: APP_ROUTES.candidates, label: 'Candidates', icon: 'assignment' },
  ]);
}
