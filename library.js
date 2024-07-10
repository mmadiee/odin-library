// MODAL
var modal = document.getElementById("newBookModal");

var btn = document.getElementById("toggleModal");

var span = document.getElementsByClassName("close")[0];

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
};

//Library
function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

const myLibrary = [
  new Book("Gideon the Ninth", "Tamsyn Muir", 496, "Not Finished"),
  new Book("The Priory of the Orange Tree", "Samantha Shannon", 880, "Finished"),
  new Book("The Shadow of Kiyoshi", "F.C. Yee", 352, "Finished")
];

function addBookToLibrary() {

}

