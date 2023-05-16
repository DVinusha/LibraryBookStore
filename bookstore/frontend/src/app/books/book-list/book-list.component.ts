import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  constructor(private bookSevice: BooksService) {}

  books = [];
  canAddBook = localStorage.getItem('type') === 'ADMIN';

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookSevice.getBooks().subscribe(
      (res: any) => {
        this.books = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
