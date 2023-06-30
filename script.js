// DOM - selections
const book_unavailable_container = document.querySelector(
  ".book-container-books-unavailable"
);

const book_available_container = document.querySelector(
  ".book-container-books-available"
);

const add_book_btn = document.querySelector(".add-book-svg-box");

// This is the book array
const book_library = [];

// This is the Book class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  // This function adds the new book to the book_library array
  add_new_book() {
    book_library.push({
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
    });
  }

  // This function removes the wanted book from book_library array
  delete_book() {
    book_library.forEach((element, index) => {
      if (element.title === this.title) {
        book_library.splice(index, 1);
      }
    });
  }
}

let new_book = new Book();
let title;
let author;
let pages;
let read;
let counter = 0;

// This is the add new book form function
const add_new_book_form_function = function () {
  // DOM - Selection For The Form
  const title_field = document.querySelector(".input-title");
  const author_field = document.querySelector(".input-author");
  const pages_field = document.querySelector(".input-pages");
  const read_book_select = document.getElementById("read-book");
  const add_book_form_btn = document.querySelector(".add-book-btn");

  // This is for assigning values to the new_book variable
  title_field.addEventListener("input", function () {
    title = title_field.value;
  });

  author_field.addEventListener("input", function () {
    author = author_field.value;
  });

  pages_field.addEventListener("input", function () {
    pages = pages_field.value;
  });

  read_book_select.addEventListener("change", function () {
    if (read_book_select.value === "yes") {
      read = true;
      read_book_select.style.backgroundColor = "#8cc084";
    }

    if (read_book_select.value === "no") {
      read = false;
      read_book_select.style.backgroundColor = "#6d4c3d";
    }
  });
  // This is for pushing the new book to the book_library array
  add_book_form_btn.addEventListener("click", function () {
    new_book.title = title;
    new_book.author = author;
    new_book.pages = pages;
    new_book.read = read;

    const new_book_string = JSON.stringify(new_book);
    // localStorage

    if (
      title === undefined ||
      author === undefined ||
      pages === undefined ||
      read === undefined
    ) {
      return;
    } else {
      if (localStorage.length <= 0) {
        localStorage.setItem("book", new_book_string);
      } else {
        localStorage.setItem(`book${localStorage.length}`, new_book_string);
      }
      window.location.href = "index.html";
    }
  });
};

// This logic is for checking if the book_library array is empty or not
document.addEventListener("DOMContentLoaded", function () {
  const localStorage_items = localStorage.getItem("book0");
  if (localStorage.length <= 0 && window.location.href.includes("index.html")) {
    book_available_container.classList.add("display-none");
    book_unavailable_container.classList.remove("display-none");
    // This is for redirect the user to the add add-book.html
    add_book_btn.addEventListener("click", function () {
      window.location.href = "add-book.html";
      add_new_book_form_function();
    });
  } else if (
    window.location.href.includes("index.html") &&
    localStorage.length > 0
  ) {
    book_unavailable_container.classList.add("display-none");
    book_available_container.classList.remove("display-none");
    const add_book = document.querySelector(".add-new-book-btn");
    add_book.addEventListener("click", function () {
      window.location.href = "add-book.html";
      add_new_book_form_function();
    });
  }

  if (window.location.href.includes("add-book.html")) {
    add_new_book_form_function();
  }
});

// **************************

// This is for delete all the book objects in the book_library array
function clean_array() {
  let size = book_library.length;
  while (size > 1) {
    book_library.splice(size, 1);
    size--;
  }
}
// clean_array();
