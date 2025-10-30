import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private ls = inject(LocalStorageService);
  readonly company = this.ls.getCompany();
}
