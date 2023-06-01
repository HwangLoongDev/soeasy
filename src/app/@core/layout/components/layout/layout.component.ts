import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/@shared/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isCollapsed: boolean = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.collapsedState$.subscribe({
      next: (value) => {
        this.isCollapsed = value;
      },
    });
  }

  toggleSidebar() {
    this.layoutService.collapsedState$.next(!this.isCollapsed);
  }
}
