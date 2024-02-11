import { BooksAPI } from './modules/booksAPI';

const refs = {
  createFormElem: document.querySelector('.js-create-form'),
  updateFormElem: document.querySelector('.js-update-form'),
  resetFormElem: document.querySelector('.js-reset-form'),
  deleteFormElem: document.querySelector('.js-delete-form'),
  bookListElem: document.querySelector('.js-article-list'),
};

refs.createFormElem.addEventListener('submit', onCreateFormSubmit);
refs.updateFormElem.addEventListener('submit', onUpdateFormSubmit);
refs.resetFormElem.addEventListener('submit', onResetFormSubmit);
refs.deleteFormElem.addEventListener('submit', onDeleteteFormSubmit);

const booksAPI = new BooksAPI();

booksAPI
  .getBooks()
  .then(data => {
    renderBooks(data.reverse());
  })
  .catch(err => {
    console.log(err);
  });

function templateBook({ id, title, desc, author }) {
  return `<li class="card book-item" data-id="${id}">
  <h4>${id} - ${title}</h4>
  <p>${desc}</p>
  <p>${author}</p>
</li>`;
}

function templateBooks(books) {
  return books.map(templateBook).join('');
}

function renderBooks(books) {
  const markup = templateBooks(books);
  refs.bookListElem.innerHTML = markup;
}

// ==============================================================================
function onCreateFormSubmit(e) {
  e.preventDefault();

  const book = {
    title: e.target.elements.bookTitle.value,
    author: e.target.elements.bookAuthor.value,
    desc: e.target.elements.bookDesc.value,
  };
  // const book = { title, author, desc };

  booksAPI.createBooks(book).then(newBook => {
    const markup = templateBook(newBook);
    refs.bookListElem.insertAdjacentElement('afterbegin', markup);
  });

  e.target.reset();
}

function onResetFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const book = {};

  formData.forEach((value, key) => {
    key = key.slice(4).toLocaleLowerCase();
    book[key] = value;
  });

  booksAPI.resetBooks(book.id, book).then(newBook => {
    const oldBookCard = document.querySelector(`[data-id="${book.id}"]`);
    const markup = templateBook(newBook);
    oldBookCard.insertAdjacentHTML('afterend', markup);
    oldBookCard.remove();
  });

  e.target.reset();
}

function onUpdateFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const book = {};

  formData.forEach((value, key) => {
    key = key.slice(4).toLocaleLowerCase();
    if (value) book[key] = value;
  });

  booksAPI.updateBook(book.id, book).then(newBook => {
    const oldBookCard = document.querySelector(`[data-id="${book.id}"]`);
    const markup = templateBook(newBook);
    oldBookCard.insertAdjacentHTML('afterend', markup);
    oldBookCard.remove();
  });

  e.target.reset();
}

function onDeleteteFormSubmit(e) {
  e.preventDefault();
  const id = e.target.elements.bookId.value;
  booksAPI.deleteBook(id).then(() => {
    const oldBookCard = document.querySelector(`[data-id="${id}"]`);
    oldBookCard.remove();
  });
}
