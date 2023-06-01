import { Component } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';
import { LayoutService } from 'src/app/@shared/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isCollapsed: boolean = false;
  username: string = '';
  constructor(
    private layoutService: LayoutService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.layoutService.collapsedState$.subscribe({
      next: (value) => {
        this.isCollapsed = value;
      },
    });

    this.authService.userData$.subscribe({
      next: (value) => {
        this.username = value?.displayName || value?.email || '';
      },
    });
  }

  toggleSidebar() {
    this.layoutService.collapsedState$.next(!this.isCollapsed);
  }
}
