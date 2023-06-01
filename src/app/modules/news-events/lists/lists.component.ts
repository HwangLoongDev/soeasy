import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsEventsService } from 'src/app/@shared/services/news-events.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  theBoundCallback!: Function;
  dataSet: any = [];
  constructor(
    private newsEventsService: NewsEventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.theBoundCallback = this.handleClickAdd.bind(this);
    this.getAllNewsEvents();
  }

  getAllNewsEvents() {
    this.newsEventsService.getAllNewsEvents().subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  handleClickAdd() {
    this.router.navigateByUrl('/news-events/create');
  }
}
