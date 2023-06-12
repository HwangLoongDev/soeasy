import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnChanges {
  @Input() multiple: boolean = false;
  @Input() limit: number = 1;
  @Input() fileUrl: string[] = [];
  @Output() emitUrl = new EventEmitter<string[]>();
  fileName: string = '';
  fileList: string[] = [];
  constructor(private fireStorage: AngularFireStorage) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('fileUrl' in changes) {
      this.fileList = changes['fileUrl'].currentValue;
    }
  }

  beforeUpload(file: NzUploadFile) {
    this.fileName = file.name;
    return true;
  }

  handleUpload = (event: NzUploadXHRArgs) => {
    const file = event.file;
    const path = `imgs/${file.name}`;
    const fileRef = this.fireStorage.ref(path);
    const task = this.fireStorage.upload(path, file);

    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((result) => {
            this.fileList = [...this.fileList, result];
            this.emitUrl.emit(this.fileList);
            event.onSuccess?.(result, file, result);
          });
        })
      )
      .subscribe({
        next: (result) => {
          const e = { percent: 0 };
          e.percent = (result!.bytesTransferred / result!.totalBytes) * 100;
          event.onProgress?.(event, file);
        },
        error: (err) => {
          event.onError?.(err, file);
        },
      });
  };

  deleteImg(idx: number) {
    this.fileList.splice(idx, 1);
  }
}
