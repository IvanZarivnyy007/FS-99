export class BooksAPI {
  constructor() {
    this.BASE_URL = 'http://localhost:3000';
    this.END_POINT = '/books';
    this.API_KEY = '1234567890';
  }

  getBooks() {
    const url = this.BASE_URL + this.END_POINT;
    return fetch(url).then(res => res.json());
  }

  createBooks(book) {
    const url = this.BASE_URL + this.END_POINT;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    };

    return fetch(url, options).then(res => res.json());
  }

  updateBooks(id, book) {
    const url = `${this.BASE_URL}${this.END_POINT}/${id}`;

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    };

    return fetch(url, options).then(res => res.json());
  }

  resetBook(id, book) {
    const url = `${this.BASE_URL}${this.END_POINT}/${id}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    };

    return fetch(url, options).then(res => res.json());
  }

  deleteBook(id) {
    const url = `${this.BASE_URL}${this.END_POINT}/${id}`;

    const options = {
      method: 'DELETE',
    };

    return fetch(url, options).then(res => res.json());
  }
}
