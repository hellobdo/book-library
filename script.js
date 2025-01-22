listOfBooks = document.querySelector(".listOfBooks");

const myLibrary = [];

function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
  }
};

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  createListBooks();
}

function createListBooks() {
  while (listOfBooks.firstChild) {
    listOfBooks.removeChild(listOfBooks.firstChild);
  }
  for (i = 0; i < myLibrary.length; i++) {
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.checked = myLibrary[i].read;
    checkbox.dataset.index = i;

    checkbox.addEventListener('change', (event) => {
      const index = event.target.dataset.index;
      const book = myLibrary[index];
      if (book) {
        book.read = event.target.checked;  // Update the `read` property based on checkbox state
        createListBooks();  // Re-render the list
        console.log(myLibrary);
      }
    })

    
    li.appendChild(checkbox);
    const span = document.createElement('span');
    span.textContent = myLibrary[i].info();
    li.appendChild(span);
    
    listOfBooks.appendChild(li);
  }
}

// Get the button and the form container
const showFormBtn = document.querySelector('.newBook');
const form = document.getElementById('bookForm');
showFormBtn.addEventListener('click', function() {
    form.style.display = 'block';
});

const submitBook = document.getElementById("submitBook");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

submitBook.addEventListener('click', (event) => {
  event.preventDefault();
  
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const pages = bookPages.value;
  const read = bookRead.checked;
  addBookToLibrary(title, author, pages, read);
  form.reset();
  form.style.display = 'none';
});


const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book2 = new Book("1984", "George Orwell", 328, false);
const book3 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const book4 = new Book("Moby-Dick", "Herman Melville", 635, false);

addBookToLibrary(book1.title, book1.author, book1.pages, book1.read);
addBookToLibrary(book2.title, book2.author, book2.pages, book2.read);
addBookToLibrary(book3.title, book3.author, book3.pages, book3.read);
addBookToLibrary(book4.title, book4.author, book4.pages, book4.read);