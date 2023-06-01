import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/@shared/services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.collapsedState$.subscribe({
      next: (value) => {
        this.isCollapsed = value;
      },
    });
  }
}
