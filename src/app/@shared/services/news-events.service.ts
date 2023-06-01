import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsEventsService {
  constructor(private http: HttpClient) {}

  getAllNewsEvents() {
    return this.http.get(`${environment.apiUrl}/news`);
  }

  getNewsEventsById(id: string) {
    return this.http.get(`${environment.apiUrl}/news/${id}`);
  }

  createNewsEvents(params: any) {
    return this.http.post(`${environment.apiUrl}/news`, params);
  }
}
