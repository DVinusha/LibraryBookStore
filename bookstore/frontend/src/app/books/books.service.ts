import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}

  addBook(data: any) {
    return this.http.post(`http://localhost:8080/books/add`, data);
  }

  getBooks() {
    return this.http.get(`http://localhost:8080/books/all`);
  }
}
