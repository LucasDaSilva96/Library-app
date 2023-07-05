// DOM selections
const search_bar = document.getElementById("search-bar");
const search_svg = document.querySelector(".search-svg-container");
const book_search_list = document.querySelector(".book-list");

import { Book } from "./script.js";
import { book_library } from "./script.js";
import { new_book } from "./script.js";

window.addEventListener("DOMContentLoaded", function () {
  let session_data = sessionStorage.getItem("search");
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      book_library[i] = JSON.parse(localStorage.getItem(`book_${i}`));
    }
  }

  let search_typed;
  search_bar.addEventListener("input", function () {
    search_typed = search_bar.value;
  });

  // *************************************
  if (session_data === undefined || session_data === null) {
    alert("Please enter a valid input");
  } else {
    const searchBooks = async (query) => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        alert("Error:", error);
      }
    };

    searchBooks(`${session_data}`).then((result) => {
      let size = result.items.length;

      if (size > 0) {
        for (let i = 0; i < size; i++) {
          book_search_list.innerHTML += `
      <div class="book-box search-list">
          <div class="book-about-txt-box">
            <h2 class="book-title">${result.items[i].volumeInfo.title}</h2>
            <p class="book-author">${result.items[i].volumeInfo.authors[0]}</p>
            <p class="book-pages">${result.items[i].volumeInfo.pageCount} pages</p>
          </div>
        <div class="book-options-container">
            <div class="add-to-favorite-box add" data-selected="false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="favorite-svg option-svgs-size"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>
          </div>
      <!-- book box/boxes end -->
    </div>
      
      `;
        }

        const add_book_svg = document.querySelectorAll(".add");

        add_book_svg.forEach((el) => {
          el.addEventListener("click", function () {
            el.children[0].classList.toggle("added");

            let index_tracker;

            new_book.title =
              el.parentElement.parentElement.children[0].children[0].innerHTML;
            new_book.author =
              el.parentElement.parentElement.children[0].children[1].innerHTML;
            new_book.pages =
              +`${el.parentElement.parentElement.children[0].children[2].innerHTML}`.split(
                " "
              )[0];
            new_book.read = false;
            new_book.favorite = false;

            // This is for saving the books title and author that the user have clicked on
            const book_to_find = {
              title_find: `${el.parentElement.parentElement.children[0].children[0].innerHTML}`,
              author_find: `${el.parentElement.parentElement.children[0].children[1].innerHTML}`,
            };

            // This is for finding the index of the book that the user has clicked on, in the arr_1 array

            if (el.dataset.selected === "false") {
              el.dataset.selected = "true";

              new_book.add_new_book();

              const array_length = book_library.length;

              for (let i = 0; i < array_length; i++) {
                localStorage.setItem(
                  `book_${i}`,
                  JSON.stringify(book_library[i])
                );
              }
            } else if (el.dataset.selected === "true") {
              el.dataset.selected = "false";
              index_tracker = book_library.findIndex(
                (book) =>
                  book.title === book_to_find.title_find &&
                  book.author === book_to_find.author_find
              );

              book_library.splice(index_tracker, 1);

              const array_length = book_library.length;

              for (let i = 0; i < array_length; i++) {
                localStorage.setItem(
                  `book_${i}`,
                  JSON.stringify(book_library[i])
                );
              }
            }
          });
        });
      }
    });
  }

  // *************************************
  search_svg.addEventListener("click", function () {
    book_search_list.innerHTML = "";
    // **************
    if (search_typed === undefined || search_typed === null) {
      alert("Please enter a valid input");
    } else {
      const searchBooks = async (query) => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
              query
            )}`
          );
          const data = await response.json();
          return data;
        } catch (error) {
          alert("Error:", error);
        }
      };

      searchBooks(`${search_typed}`).then((result) => {
        let size = result.items.length;

        if (size > 0) {
          for (let i = 0; i < size; i++) {
            book_search_list.innerHTML += `
          <div class="book-box search-list">
              <div class="book-about-txt-box">
                <h2 class="book-title">${result.items[i].volumeInfo.title}</h2>
                <p class="book-author">${result.items[i].volumeInfo.authors[0]}</p>
                <p class="book-pages">${result.items[i].volumeInfo.pageCount} pages</p>
              </div>
            <div class="book-options-container">
                <div class="add-to-favorite-box add" data-selected="false">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="favorite-svg option-svgs-size"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
              </div>
          <!-- book box/boxes end -->
        </div>
          
          `;
          }

          const add_book_svg = document.querySelectorAll(".add");

          add_book_svg.forEach((el) => {
            el.addEventListener("click", function () {
              el.children[0].classList.toggle("added");

              let index_tracker;

              new_book.title =
                el.parentElement.parentElement.children[0].children[0].innerHTML;
              new_book.author =
                el.parentElement.parentElement.children[0].children[1].innerHTML;
              new_book.pages =
                +`${el.parentElement.parentElement.children[0].children[2].innerHTML}`.split(
                  " "
                )[0];
              new_book.read = false;
              new_book.favorite = false;

              // This is for saving the books title and author that the user have clicked on
              const book_to_find = {
                title_find: `${el.parentElement.parentElement.children[0].children[0].innerHTML}`,
                author_find: `${el.parentElement.parentElement.children[0].children[1].innerHTML}`,
              };

              // This is for finding the index of the book that the user has clicked on, in the arr_1 array

              if (el.dataset.selected === "false") {
                el.dataset.selected = "true";

                new_book.add_new_book();

                const array_length = book_library.length;

                for (let i = 0; i < array_length; i++) {
                  localStorage.setItem(
                    `book_${i}`,
                    JSON.stringify(book_library[i])
                  );
                }
              } else if (el.dataset.selected === "true") {
                el.dataset.selected = "false";
                index_tracker = book_library.findIndex(
                  (book) =>
                    book.title === book_to_find.title_find &&
                    book.author === book_to_find.author_find
                );

                book_library.splice(index_tracker, 1);

                const array_length = book_library.length;

                for (let i = 0; i < array_length; i++) {
                  localStorage.setItem(
                    `book_${i}`,
                    JSON.stringify(book_library[i])
                  );
                }
              }
            });
          });
        }
      });
    }
  });
  // *************
});
