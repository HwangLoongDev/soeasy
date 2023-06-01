import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadXHRArgs,
} from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  @Output() emitUrl = new EventEmitter<string>();
  fileName: string = '';
  constructor(private fireStorage: AngularFireStorage) {}

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
            this.emitUrl.emit(result);
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
}
