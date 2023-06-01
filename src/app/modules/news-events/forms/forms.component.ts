import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { NewsEventsService } from 'src/app/@shared/services/news-events.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, finalize, from } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  formNewsEvents!: FormGroup;
  fileName: string = '';

  constructor(
    private fb: FormBuilder,
    private newsEventsService: NewsEventsService,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.formNewsEvents = this.fb.group({
      title: new FormControl('', [Validators.required]),
      thumbnail: new FormControl('', [Validators.required]),
      effectiveDate: new FormControl([], [Validators.required]),
      description: new FormControl('', [Validators.required]),
      editorContent: new FormControl('', [Validators.required]),
    });
  }

  receivedImageUrl(url: string) {
    this.formNewsEvents.patchValue({ thumbnail: url });
  }

  submitForm() {
    if (this.formNewsEvents.valid) {
      const params = { ...this.formNewsEvents.value };

      this.newsEventsService.createNewsEvents(params).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
