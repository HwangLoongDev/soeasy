import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewsEventsService } from 'src/app/@shared/services/news-events.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';
import { genSlugFromTitle } from 'src/app/@core/utils/common-functions';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { INews } from 'src/app/@core/models/news.model';
import ImageResize from 'quill-image-resize-module';
// import BlotFormatter from 'quill-blot-formatter';
import Quill from 'quill';
Quill.register('modules/imageResize', ImageResize);
// Quill.register({ 'modules/blotFormatter': BlotFormatter }, true);

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  formNewsEvents!: FormGroup;
  fileName: string = '';
  isUpdate: boolean = false;
  quillModules = {};

  constructor(
    private fb: FormBuilder,
    private newsEventsService: NewsEventsService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formNewsEvents = this.fb.group({
      title: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
      banner: new FormControl(false, [Validators.required]),
      thumbnail: new FormControl([], [Validators.required]),
      effectiveDate: new FormControl([], [Validators.required]),
      description: new FormControl('', [Validators.required]),
      editorContent: new FormControl('', [Validators.required]),
    });

    this.quillModules = { imageResize: {} };

    this.formNewsEvents
      .get('title')
      ?.valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          this.formNewsEvents.patchValue({ slug: genSlugFromTitle(value) });
        },
      });

    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isUpdate = true;
      const docId = this.activatedRoute.snapshot.paramMap.get('id');

      this.newsEventsService.getNewsById(docId!).subscribe({
        next: (docRef) => {
          const data = docRef.data() as INews;
          this.formNewsEvents.patchValue({
            title: data.title,
            slug: data.slug,
            banner: data.banner,
            thumbnail: data.thumbnail,
            effectiveDate: [
              new Date(data.effectiveDate[0]),
              new Date(data.effectiveDate[1]),
            ],
            description: data.description,
            editorContent: data.editorContent,
          });
        },
        error: (err) => {
          console.log(err);
          this.message.error('Có lỗi xảy ra!');
        },
      });
    }
  }

  changeDatePicker(event: (Date | null)[]) {
    this.formNewsEvents.patchValue({ effectiveDate: event });
  }

  receivedImageUrl(url: string[]) {
    this.formNewsEvents.patchValue({ thumbnail: url });
  }

  submitForm() {
    if (this.formNewsEvents.valid) {
      if (this.isUpdate) {
        const params = {
          ...this.formNewsEvents.value,
          effectiveDate: [
            moment(this.formNewsEvents.value.effectiveDate[0]).format(),
            moment(this.formNewsEvents.value.effectiveDate[1]).format(),
          ],
        };
        const docId = this.activatedRoute.snapshot.paramMap.get('id');
        this.newsEventsService.updateNewsById(docId!, params).subscribe({
          next: () => {
            this.message.success('Cập nhật thành công!');
          },
          error: (err) => {
            console.log(err);
            this.message.error('Có lỗi xảy ra!');
          },
        });
      } else {
        const params = {
          ...this.formNewsEvents.value,
          effectiveDate: [
            moment(this.formNewsEvents.value.effectiveDate[0]).format(),
            moment(this.formNewsEvents.value.effectiveDate[1]).format(),
          ],
        };

        this.newsEventsService.createNews(params).subscribe({
          next: (docRef) => {
            this.message.success('Thêm dữ liệu thành công!');
            this.router.navigateByUrl(`/news/update/${docRef.id}`);
          },
          error: (err) => {
            console.log(err);
            this.message.error('Có lỗi xảy ra!');
          },
        });
      }
    } else {
      console.log(this.formNewsEvents);
    }
  }
}
