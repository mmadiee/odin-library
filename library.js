// MODAL
let modal = document.getElementById("newBookModal");

let btn = document.getElementById("toggleModal");

let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }

  if (event.target == bookInfoModal) {
    bookInfoModal.style.display = "none";
  }
};

// Function to toggle progress status
function toggleProgress(bookIndex) {
  const book = myLibrary[bookIndex];

  switch (book.haveRead) {
    case "TBR":
      book.haveRead = "Reading";
      break;
    case "Reading":
      book.haveRead = "Finished";
      break;
    case "Finished":
      book.haveRead = "TBR";
      break;
    default:
      book.haveRead = "TBR";
      break;
  }
}

// Function to update the UI based on current book data
function updateUI(bookIndex) {
  const book = myLibrary[bookIndex];
  const updateButton = document.getElementById("updateProgress");

  switch (book.haveRead) {
    case "TBR":
      updateButton.textContent = "Mark as Reading";
      break;
    case "Reading":
      updateButton.textContent = "Mark as Finished";
      break;
    case "Finished":
      updateButton.textContent = "Mark as TBR";
      break;
    default:
      updateButton.textContent = "Mark as TBR";
      break;
  }
}

// Event listener for updating progress
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("update-progress-btn")) {
    const bookIndex = event.target.dataset.index;
    toggleProgress(bookIndex);
    updateUI(bookIndex);
    displayBooks(); // Refresh the displayed books
    bookInfoModal.style.display = "none"; // Close modal after update
  }
});

//Library
function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

const myLibrary = [
  new Book("Dowry of Blood", "S.T Gibson", 304, "TBR"),
  new Book("Gideon the Ninth", "Tamsyn Muir", 496, "Reading"),
  new Book(
    "The Priory of the Orange Tree",
    "Samantha Shannon",
    880,
    "Finished"
  ),
  new Book("The Shadow of Kiyoshi", "F.C. Yee", 352, "Finished"),
];

function addBookToLibrary() {
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pageCountInput = document.getElementById("page-count");

  const title = titleInput.value;
  const author = authorInput.value;
  const numOfPages = pageCountInput.value;
  const haveRead = "TBR";

  const newBook = new Book(title, author, numOfPages, haveRead);
  myLibrary.push(newBook);
  modal.style.display = "none";
  displayBooks();

  // Clear the form
  titleInput.value = "";
  authorInput.value = "";
  pageCountInput.value = "";
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
  bookInfoModal.style.display = "none";
}

function displayBooks() {
  const shelf = document.getElementById("book-list");
  shelf.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-area");

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.id = "toggleBook";

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title-div");

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author-div");

    const bookIcon = document.createElement("span");
    bookIcon.classList.add("material-symbols-outlined");
    bookIcon.textContent = `import_contacts`;

    const title = document.createElement("h4");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `${book.author}`;

    const info = document.createElement("div");
    info.classList.add("book-info");

    const pages = document.createElement("p");
    pages.textContent = ` ${book.numOfPages}p.`;

    const status = document.createElement("p");
    status.textContent = `${book.haveRead}`;

    titleDiv.appendChild(bookIcon);
    titleDiv.appendChild(title);
    authorDiv.appendChild(author);
    info.appendChild(pages);
    info.appendChild(status);

    bookCard.appendChild(titleDiv);
    bookCard.appendChild(authorDiv);
    card.appendChild(bookCard);
    card.appendChild(info);
    shelf.appendChild(card);

    bookCard.onclick = function () {
      const deleteBook = document.getElementById("deleteBook");
      deleteBook.setAttribute("data-index", index);
      deleteBook.onclick = function () {
        removeBook(index);
      };

      // Add data-index attribute to the update progress button
      const updateProgress = document.getElementById("updateProgress");
      updateProgress.setAttribute("data-index", index);

      bookInfoModal.style.display = "block";
    };
  });
}

displayBooks();

let span1 = document.getElementsByClassName("close")[1];

span1.onclick = function () {
  bookInfoModal.style.display = "none";
};
