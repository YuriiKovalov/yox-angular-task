import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.scss'],
})
export class SideBar {
  protected readonly items = signal([
    { path: APP_ROUTES.dashboard, label: 'Dashboard', icon: 'dashboard' },
    { path: APP_ROUTES.workplaces, label: 'Workplaces', icon: 'store' },
    { path: APP_ROUTES.requisitions, label: 'Requisitions', icon: 'work' },
    { path: APP_ROUTES.candidates, label: 'Candidates', icon: 'assignment' },
  ]);
}
