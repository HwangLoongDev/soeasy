import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize, take, tap } from 'rxjs';
import { INews } from 'src/app/@core/models/news.model';
import { NewsEventsService } from 'src/app/@shared/services/news-events.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  listNews: INews[] = [];
  theBoundCallback!: Function;
  loading: boolean = false;

  constructor(
    private newsEventsService: NewsEventsService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.theBoundCallback = this.handleClickAdd.bind(this);
    this.getAllNews();
  }

  getAllNews() {
    this.loading = true;
    this.newsEventsService.getAllNews().subscribe({
      next: (response) => {
        this.loading = false;
        console.log(response[0].effectiveDate);

        this.listNews = response;
        this.message.success('Lấy dữ liệu thành công!');
      },
      error: () => {
        this.message.success('Có lỗi xảy ra!');
        this.loading = false;
      },
    });
  }

  handleClickAdd() {
    this.router.navigateByUrl('/news/create');
  }
}
