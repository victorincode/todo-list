import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ItemData } from '../interfaces/item-data.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiHandlerService {
  private baseUrl =
    'https://learning-firebase-5b019-default-rtdb.firebaseio.com';

  constructor(private readonly httpClient: HttpClient) {}

  getData(): Observable<ItemData[]> {
    return this.httpClient
      .get<{ [key: string]: ItemData }>([this.baseUrl, 'posts.json'].join('/'))
      .pipe(
        map((responseData) => {
          const itemArray: ItemData[] = [];
          for (let key in responseData) {
            itemArray.push({ ...responseData[key], id: key });
          }
          return itemArray;
        })
      );
  }

  postItem(item: ItemData) {
    return this.httpClient.post<{ name: string }>(
      [this.baseUrl, 'posts.json'].join('/'),
      item
    );
  }

  deleteItem(id: string) {
    const url = `${this.baseUrl}/posts/${id}.json`;
    return this.httpClient.delete(url);
  }

  deleteAllItems() {
    return this.httpClient.delete(this.baseUrl + '/posts.json');
  }

  updateItem(id: string, updates: {}) {
    const url = `${this.baseUrl}/posts/${id}.json`;
    return this.httpClient.patch<{ content: string; title: string }>(
      url,
      updates
    );
  }
}
