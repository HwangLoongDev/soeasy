import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/@shared/services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  @Input() username: string = '';
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.SignOut();
  }
}
