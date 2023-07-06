// DOM - selections
const book_unavailable_container = document.querySelector(
  ".book-container-books-unavailable"
);

const book_available_container = document.querySelector(
  ".book-container-books-available"
);
const search_bar = document.getElementById("search-bar");
const search_svg = document.querySelector(".search-svg-container");
const add_book_btn = document.querySelector(".add-book-svg-box");
const search_svg_icon = document.querySelector(".search-svg");

// ***********
let search_typed;

// This is the book array for the index.html. This array
// will be used to save the new books and push it to the localStorage
const book_library = [];

// This is the Book class, all books will be created with this class
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

export { Book };
export { book_library };
export { new_book };

// This is the add new book form function
// This function will be invoked when the user is on the
// add-book.html
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

    // This is for converting the new_book object to a string,
    // this is necessary for storing the object to the localStorage
    const new_book_string = JSON.stringify(new_book);

    // This is for making sure that the user can't just add an
    // empty book object to the localStorage
    if (
      title === undefined ||
      author === undefined ||
      pages === undefined ||
      read === undefined
    ) {
      return;
    } else {
      // This is for giving the new_book object the right name,
      // because every key in the localStorage must be unique
      if (localStorage.length <= 0) {
        localStorage.setItem("book_0", new_book_string);
      } else {
        localStorage.setItem(`book_${localStorage.length}`, new_book_string);
      }

      // This is for redirect the user back to the index.html
      setTimeout(function () {
        window.location.href = "./index.html";
      }, 300);
    }
  });
};

// This is for checking if the DOM has loaded, and if so invoke everything inside
document.addEventListener("DOMContentLoaded", function () {
  // This checks if the localStorage has any books stored and if the user is on the
  // index.html file. If the localStorage is empty do the following....
  if (localStorage.length <= 0 && window.location.href.includes("index.html")) {
    // **********************************
    search_bar.addEventListener("input", function () {
      search_typed = search_bar.value;
    });

    // **********************************

    // ******************************************
    // This is the search function. The function takes the input from the user and stored it on the
    // sessionStorage, then redirect the user to the search.html file, which then retrieves the
    // data saved in the sessionStorage to perform the search with the google book API
    search_svg.addEventListener("click", function () {
      search_svg_icon.classList.add("rotate-scale-up");
      setTimeout(function () {
        search_svg_icon.classList.remove("rotate-scale-up");
      }, 900);
      if (search_typed === undefined || search_typed === null) {
        alert("Please enter a valid input");
      } else {
        sessionStorage.setItem("search", search_typed);

        setTimeout(function () {
          window.location.href = "./search.html";
        }, 750);
      }
    });

    // *******************************************
    book_available_container.classList.add("display-none");
    book_unavailable_container.classList.remove("display-none");
    // This is for redirect the user to the add add-book.html
    add_book_btn.addEventListener("click", function () {
      window.location.href = "./add-book.html";
      add_new_book_form_function();
    });

    // This checks if the localStorage has any books stored and if the user is on the
    // index.html file. If the localStorage is NOT empty do the following....
  } else if (
    window.location.href.includes("index.html") &&
    localStorage.length > 0
  ) {
    // **********************************
    search_bar.addEventListener("input", function () {
      search_typed = search_bar.value;
    });

    // **********************************

    // ******************************************
    // This is the search function. The function takes the input from the user and stored it on the
    // sessionStorage, then redirect the user to the search.html file, which then retrieves the
    // data saved in the sessionStorage to perform the search with the google book API
    search_svg.addEventListener("click", function () {
      search_svg_icon.classList.add("rotate-scale-up");
      setTimeout(function () {
        search_svg_icon.classList.remove("rotate-scale-up");
      }, 900);
      if (search_typed === undefined || search_typed === null) {
        alert("Please enter a valid input");
      } else {
        sessionStorage.setItem("search", search_typed);

        setTimeout(function () {
          window.location.href = "./search.html";
        }, 750);
      }
    });

    // *******************************************
    book_unavailable_container.classList.add("display-none");
    book_available_container.classList.remove("display-none");
    // ****************************************************
    const book_list = document.querySelector(".book-list");

    // This is for saving the localStorage books in the book_library array,
    // and for making sure that the do-while-loop don't run forever
    let size = 0;

    // This is for getting the books in the localStorage and save it in the
    // book_library array[size index]
    do {
      book_library[size] = JSON.parse(localStorage.getItem(`book_${size}`));

      // After the localStorage/books has been stored in the book_library array,
      // the loop shall render the books so that the user can see it.
      // In this html there are some check-points for making sure the that
      // right css-class is added depending on the current book properties
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

    // This is for selecting all the books favorite-svg
    const favo_btns = document.querySelectorAll(".add-to-favorite-box");

    // This is for looping through all the books and change the favorite-status
    // of the clicked book from true to false and false to true, and also for toggling the css-class
    // that adds animation to the favorite-svg
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

    // This is for selecting all the books read-svg
    const read_btns = document.querySelectorAll(".mark-as-read-box");

    // This is for looping through all the books and change the book-read-status
    // of the clicked book from true to false and false to true, and also for toggling the css-class
    // that adds animation to the read-svg
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

    // This is for redirect the user to the add-book.html file so that
    // the user can add a new book to the localStorage
    const add_book = document.querySelector(".add-new-book-btn");
    add_book.addEventListener("click", function () {
      window.location.href = "./add-book.html";
      add_new_book_form_function();
    });

    // This is for selecting all the books delete-svg
    const delete_box = document.querySelectorAll(".delete-box");

    // This is for looping through the all the books in the book_library array and
    // and delete the clicked book and update the localStorage with the new book_library
    // array
    delete_box.forEach((el) => {
      el.addEventListener("click", function () {
        el.children[0].classList.toggle("deleted");

        let index_tracker;

        // This is for saving the books title and author that the user have clicked on
        const book_to_find = {
          title_find: `${el.parentNode.parentNode.children[0].firstChild.nextSibling.textContent}`,
          author_find: `${el.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.textContent}`,
        };

        // This is for finding the index of the book that the user has clicked on, in the book_library array
        index_tracker = book_library.findIndex(
          (book) =>
            book.title === book_to_find.title_find &&
            book.author === book_to_find.author_find
        );

        // This is for deleting the book that the user has clicked on
        book_library.splice(index_tracker, 1);

        // This is for clearing the localStorage every time the user deletes a book
        localStorage.clear();

        // This is for making sure that the user still have book/books object in the
        // book_library array before storing the updated book_library array to the
        // localStorage
        if (book_library.length > 0) {
          for (let i = 0; i < book_library.length; i++) {
            localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
          }
        }

        // this is for reloading the current page so that the user
        // gets the updated localStorage
        setTimeout(function () {
          location.reload();
        }, 500);
      });
    });
  }

  // ****************************************************
  // This is for invoking the add_new_book_form_function when the user is on
  // the add-book.html file.
  if (window.location.href.includes("add-book.html")) {
    add_new_book_form_function();
  }
  // ****************************************************

  if (window.location.href.includes("library-log.html")) {
    const motivation_box = document.querySelector(".motivation-box");
    const nr_of_books_read_box = document.querySelector(".number-of-pages");

    // **********************************
    search_bar.addEventListener("input", function () {
      search_typed = search_bar.value;
    });

    // **********************************
    // ******************************************
    // This is the search function. The function takes the input from the user and stored it on the
    // sessionStorage, then redirect the user to the search.html file, which then retrieves the
    // data saved in the sessionStorage to perform the search with the google book API
    search_svg.addEventListener("click", function () {
      search_svg_icon.classList.add("rotate-scale-up");
      setTimeout(function () {
        search_svg_icon.classList.remove("rotate-scale-up");
      }, 900);
      if (search_typed === undefined || search_typed === null) {
        alert("Please enter a valid input");
      } else {
        sessionStorage.setItem("search", search_typed);

        setTimeout(function () {
          window.location.href = "./search.html";
        }, 750);
      }
    });

    // *******************************************

    const nr_of_books_read = document.querySelector(
      ".number-of-books-read-box"
    );

    const nr_of_pages_read = document.querySelector(".nr-of-pages-read");

    // This array is for saving the localStorage in it
    const books_log_array = [];
    // This is for saving the total number of pages that the user have read
    let nr_of_pages = 0;
    // This is for saving the total number of books that the user have read
    let nr_of_books = 0;

    // This is for saving the localStorage to the books_log_array
    // and then update the number of books/pages read boxes
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        books_log_array[i] = JSON.parse(localStorage.getItem(`book_${i}`));
      }

      // This is for looping through the book_log_array and check if
      // the current book-object has the read.property === true, and
      // if so updates the nr_of_Books and nr_of_pages variables
      books_log_array.forEach((el) => {
        if (el.read === true) {
          nr_of_pages += Number(el.pages);
          nr_of_books++;
        }
      });
    }

    if (nr_of_books <= 0) {
      nr_of_books_read.style.backgroundColor = "#6d4c3d";
      motivation_box.style.backgroundColor = "#6d4c3d";
      nr_of_books_read_box.style.backgroundColor = "#6d4c3d";
      motivation_box.children[0].textContent = "Start reading today!";
    } else {
      nr_of_books_read_box.style.backgroundColor = "#8cc084";
    }

    nr_of_books_read.textContent = `${nr_of_books}`;
    nr_of_pages_read.textContent = `${nr_of_pages}`;
  }
  // ****************************************************

  if (window.location.href.includes("favorite.html")) {
    // **********************************
    search_bar.addEventListener("input", function () {
      search_typed = search_bar.value;
    });

    // **********************************
    // ******************************************
    // This is the search function. The function takes the input from the user and stored it on the
    // sessionStorage, then redirect the user to the search.html file, which then retrieves the
    // data saved in the sessionStorage to perform the search with the google book API
    search_svg.addEventListener("click", function () {
      search_svg_icon.classList.add("rotate-scale-up");
      setTimeout(function () {
        search_svg_icon.classList.remove("rotate-scale-up");
      }, 900);
      if (search_typed === undefined || search_typed === null) {
        alert("Please enter a valid input");
      } else {
        sessionStorage.setItem("search", search_typed);

        setTimeout(function () {
          window.location.href = "./search.html";
        }, 750);
      }
    });

    // *******************************************
    const book_list_favo = document.querySelector(".book-list");
    // This variable will keep track of the number of books object
    // that has the property "new_book".favorite = true
    let favo_counter = 0;
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        book_library[i] = JSON.parse(localStorage.getItem(`book_${i}`));
      }

      book_list_favo.style.height = "750px";

      // This is for looping through the arr_1 and check if the current
      // object has favorite property set to true, and if so
      // increment the favo_counter by 1;
      for (let i = 0; i < book_library.length; i++) {
        if (book_library[i].favorite === true) {
          favo_counter++;
        }
      }
    }
    // ******
    // If the user has any/some book/books set to favorite
    // then the user should see them
    // In this html there are some check-points for making sure the that
    // right css-class is added depending on the current book properties
    if (favo_counter > 0) {
      for (let i = 0; i < book_library.length; i++) {
        if (book_library[i].favorite === true) {
          book_list_favo.innerHTML += `
        <div class="book-box ${
          book_library[i].read === false ? "not-read" : ""
        }">
        <div class="book-about-txt-box">
          <h2 class="book-title">${book_library[i].title}</h2>
          <p class="book-author">${book_library[i].author}</p>
          <p class="book-pages">${book_library[i].pages} pages</p>
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
              class="read-svg option-svgs-size ${
                book_library[i].read === true ? "read-svg-clicked" : ""
              }""
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

      // This is for selecting all the books favorite-svg
      let favo_list_btns = document.querySelectorAll(".add-to-favorite-box");

      // This is for looping through all the books and change the favorite-status
      // of the clicked book from true to false and false to true
      // and if the favorite is set to false the current book should be removed from the list
      // ,and also for toggling the css-class that adds animation to the favorite-svg
      favo_list_btns.forEach((el) => {
        el.addEventListener("click", function () {
          let index_tracker;

          // This is for saving the books title and author that the user have clicked on
          const book_to_find = {
            title_find: `${el.parentNode.parentNode.children[0].firstChild.nextSibling.textContent}`,
            author_find: `${el.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.textContent}`,
          };

          // This is for finding the index of the book that the user has clicked on, in the book_library array
          index_tracker = book_library.findIndex(
            (book) =>
              book.title === book_to_find.title_find &&
              book.author === book_to_find.author_find
          );

          // This is for setting the book that the user has clicked on favorite property to false
          book_library[index_tracker].favorite = false;

          // This is for updating the localStorage with the updated books properties
          for (let i = 0; i < localStorage.length; i++) {
            localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
          }

          el.children[0].classList.remove("favo-svg-clicked");

          // this is for reloading the current page so that the user
          // gets the updated localStorage
          setTimeout(function () {
            location.reload();
          }, 500);
        });
        // ***
      });

      const delete_box = document.querySelectorAll(".delete-box");

      // This is for looping through the all the books in the book_library array and
      // and delete the clicked book and update the localStorage with the new book_library
      // array
      delete_box.forEach((el) => {
        el.addEventListener("click", function () {
          el.children[0].classList.toggle("deleted");

          let index_tracker;
          // This is for saving the books title and author that the user have clicked on
          const book_to_find = {
            title_find: `${el.parentElement.parentElement.children[0].children[0].innerHTML}`,
            author_find: `${el.parentElement.parentElement.children[0].children[1].innerHTML}`,
          };
          // This is for finding the index of the book that the user has clicked on, in the book_library array
          index_tracker = book_library.findIndex(
            (book) =>
              book.title === book_to_find.title_find &&
              book.author === book_to_find.author_find
          );

          // This is for deleting the book that the user has clicked on
          console.log(index_tracker, ":", book_library);

          book_library.splice(index_tracker, 1);
          const array_length = book_library.length;

          // This is for clearing the localStorage every time the user deletes a book
          localStorage.clear();

          // This is for making sure that the user still have book/books object in the
          // book_library array before storing the updated book_library array to the
          // localStorage
          if (book_library.length > 0) {
            for (let i = 0; i < array_length; i++) {
              localStorage.setItem(
                `book_${i}`,
                JSON.stringify(book_library[i])
              );
            }
          }

          // this is for reloading the current page so that the user
          // gets the updated localStorage
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      });

      // This is for selecting all the books read-svg
      const read_favo_btns = document.querySelectorAll(".mark-as-read-box");

      // This is for looping through all the books and change the book-read-status
      // of the clicked book from true to false and false to true, and also for toggling the css-class
      // that adds animation to the read-svg
      read_favo_btns.forEach((el) => {
        el.addEventListener("click", function () {
          el.children[0].classList.toggle("read-svg-clicked");

          let index_tracker;

          // This is for saving the books title and author that the user have clicked on
          const book_to_find = {
            title_find: `${el.parentNode.parentNode.children[0].firstChild.nextSibling.textContent}`,
            author_find: `${el.parentNode.parentNode.children[0].firstElementChild.nextElementSibling.textContent}`,
          };

          // This is for finding the index of the book that the user has clicked on, in the arr_1 array
          index_tracker = book_library.findIndex(
            (book) =>
              book.title === book_to_find.title_find &&
              book.author === book_to_find.author_find
          );

          // This is for toggling the book that the user has clicked on read property between false
          // and true
          if (book_library[index_tracker].read === true) {
            book_library[index_tracker].read = false;
          } else if (book_library[index_tracker].read === false) {
            book_library[index_tracker].read = true;
          }

          // This is for updating the localStorage with the updated books properties
          for (let i = 0; i < localStorage.length; i++) {
            localStorage.setItem(`book_${i}`, JSON.stringify(book_library[i]));
          }

          // this is for reloading the current page so that the user
          // gets the updated localStorage
          setTimeout(function () {
            location.reload();
          }, 500);
        });
      });

      // If the user doesn't have any book set to favorite of the localStorage is empty
      // this should be rended
    } else {
      book_list_favo.innerHTML = `
      <div class="book-about-txt-box">
      <h2 class="book-title">Your list is empty</h2>
      </div>
      `;
      return;
    }
  }
  // ****************************************************
});
