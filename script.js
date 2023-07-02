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
  constructor(title, author, pages, read, favorite) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.favorite = favorite;
  }
  // This function adds the new book to the book_library array
  add_new_book() {
    book_library.push({
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
      favorite: this.favorite,
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
let favorite;
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
        localStorage.setItem("book_0", new_book_string);
      } else {
        localStorage.setItem(`book_${localStorage.length}`, new_book_string);
      }
      window.location.href = "index.html";
    }
  });
};

// This logic is for checking if the book_library array is empty or not
document.addEventListener("DOMContentLoaded", function () {
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
    // ****************************************************
    const book_list = document.querySelector(".book-list");

    let size = 0;

    do {
      book_library[size] = JSON.parse(localStorage.getItem(`book_${size}`));
      book_list.innerHTML += `
        <div class="book-box ${
          book_library[size].read === true ? "read" : "not-read"
        }">
          <div class="book-about-txt-box">
            <h2 class="book-title">${book_library[size].title}</h2>
            <p class="book-author">${book_library[size].author}</p>
            <p class="book-pages">${book_library[size].pages} pages</p>
          </div>
          <div class="book-options-container">
            <!--  -->
            <div class="add-to-favorite-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="favorite-svg option-svgs-size ${
                  book_library[size].favorite === true ? "favo-svg-clicked" : ""
                }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
            <!--  -->
            <div class="mark-as-read-box ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="read-svg option-svgs-size ${
                  book_library[size].read === true ? "read-svg-clicked" : ""
                }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <!--  -->
            <div class="delete-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="delete-svg option-svgs-size"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
          <!--  -->
        </div>
`;

      size += 1;
    } while (size < localStorage.length);

    const favo_btns = document.querySelectorAll(".add-to-favorite-box");

    favo_btns.forEach((el, i) => {
      el.addEventListener("click", function () {
        el.children[0].classList.toggle("favo-svg-clicked");

        if (
          book_library[i].favorite === undefined ||
          book_library[i].favorite === false
        ) {
          book_library[i].favorite = true;
          localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
        } else if (book_library[i].favorite === true) {
          book_library[i].favorite = false;
          localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
        }
      });
    });

    const read_btns = document.querySelectorAll(".mark-as-read-box");

    read_btns.forEach((el, i) => {
      el.addEventListener("click", function () {
        el.children[0].classList.toggle("read-svg-clicked");

        if (book_library[i].read === false) {
          book_library[i].read = true;
          localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
          location.reload();
        } else if (book_library[i].read === true) {
          book_library[i].read = false;
          localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
          location.reload();
        }
      });
    });

    // ****************************************************
    const add_book = document.querySelector(".add-new-book-btn");
    add_book.addEventListener("click", function () {
      window.location.href = "add-book.html";
      add_new_book_form_function();
    });
  }

  // ****************************************************

  if (window.location.href.includes("add-book.html")) {
    add_new_book_form_function();
  }
  // ****************************************************

  if (window.location.href.includes("library-log.html")) {
    const nr_of_books_read = document.querySelector(
      ".number-of-books-read-box"
    );

    const nr_of_pages_read = document.querySelector(".nr-of-pages-read");

    const books_log_array = [];
    let nr_of_pages = 0;
    let nr_of_Books = 0;
    for (let i = 0; i < localStorage.length; i++) {
      books_log_array[i] = JSON.parse(localStorage.getItem(`book_${i}`));
    }
    books_log_array.forEach((el) => {
      if (el.read === true) {
        nr_of_pages += Number(el.pages);
        nr_of_Books++;
      }
    });

    nr_of_books_read.textContent = `${nr_of_Books}`;
    nr_of_pages_read.textContent = `${nr_of_pages}`;
  }
  // ****************************************************

  if (
    window.location.href.includes("favorite.html") &&
    localStorage.length > 0
  ) {
    let arr_1 = [];
    for (let i = 0; i < localStorage.length; i++) {
      arr_1[i] = JSON.parse(localStorage.getItem(`book_${i}`));
    }

    console.log(arr_1);

    const book_list_favo = document.querySelector(".book-list");
    book_list_favo.style.maxHeight = "100%";
    let favo_counter = 0;
    for (let i = 0; i < arr_1.length; i++) {
      if (arr_1[i].favorite === true) {
        favo_counter++;
        book_list_favo.innerHTML += `
        <div class="book-box ${arr_1[i].read === false ? "not-read" : ""}">
        <div class="book-about-txt-box">
          <h2 class="book-title">${arr_1[i].title}</h2>
          <p class="book-author">${arr_1[i].author}</p>
          <p class="book-pages">${arr_1[i].pages} pages</p>
        </div>
        <div class="book-options-container">
          <!--  -->
          <div class="add-to-favorite-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="favorite-svg option-svgs-size favo-svg-clicked"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </div>
          <!--  -->
          <div class="mark-as-read-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="read-svg option-svgs-size"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <!--  -->
          <div class="delete-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="delete-svg option-svgs-size"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
        <!--  -->
      </div>
        `;
      }
    }
    if (favo_counter === 0) {
      book_list_favo.innerHTML = `
      <div class="book-about-txt-box">
      <h2 class="book-title">Your list is empty</h2>
      </div>
      `;
      return;
    }

    let favo_list_btns = document.querySelectorAll(".add-to-favorite-box");

    favo_list_btns.forEach((el) => {
      el.addEventListener("click", function () {
        let index_tracker;

        const book_to_find = {
          title_find: `${el.parentNode.parentNode.children[0].firstChild.nextSibling.textContent}`,
          author_find: `${el.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.textContent}`,
        };

        index_tracker = arr_1.findIndex(
          (book) =>
            book.title === book_to_find.title_find &&
            book.author === book_to_find.author_find
        );

        arr_1[index_tracker].favorite = false;

        for (let i = 0; i < localStorage.length; i++) {
          localStorage.setItem(`book_${i}`, JSON.stringify(arr_1[i]));
        }

        el.children[0].classList.remove("favo-svg-clicked");

        setTimeout(function () {
          location.reload();
        }, 500);
      });
      // ***
    });
  }
  // ****************************************************
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
