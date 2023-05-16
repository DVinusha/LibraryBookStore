import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bookService: BooksService,
    private router: Router
  ) {}

  bookForm = this.fb.group({
    bookName: ['', Validators.required],
    bookdescription: ['Admin', Validators.required],
    authorName: ['', Validators.required],
    price: [null, Validators.required],
  });

  ngOnInit(): void {
    if (localStorage.getItem('type') !== 'ADMIN') {
      this.router.navigateByUrl('/books/list');
    }
  }

  addBook() {
    if (this.bookForm.valid) {
      this.bookService.addBook(this.bookForm.value).subscribe(
        (res) => {
          this.router.navigateByUrl('/books/list');
        },
        (err) => console.log(err)
      );
    } else {
      this.bookForm.markAllAsTouched();
    }
  }
}
