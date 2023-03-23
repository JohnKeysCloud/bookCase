const body = document.body;
const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');
const addBookModal = document.querySelector('dialog');
const addBookBtn = document.getElementById('add-book-button');
let bookCase = [];

console.log(addBookBtn);
console.log(addBookModal);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToCase(book) {
    bookCase.push(book);
}

function removeBookFromCase(book) {
    bookCase.splice(bookCase.indexOf(book), 1);
}

function populateBookCase() {
    for (let i = 0; i < bookCase.length; i++) {
        let bookCard = document.createElement('article');
        
        let descriptionList = document.createElement('dl');
        let bookTitle = document.createElement('dt');
        let bookAuthor = document.createElement('dt');
        let bookPages = document.createElement('dt');
        let bookRead = document.createElement('dt');

        bookTitle.textContent = bookCase[i].title;
        bookAuthor.textContent = bookCase[i].author;
        bookPages.textContent = bookCase[i].pages;
        bookRead.textContent = bookCase[i].read;
        
        descriptionList.appendChild(bookTitle);
        descriptionList.appendChild(bookAuthor);
        descriptionList.appendChild(bookPages);
        descriptionList.appendChild(bookRead);
        
        bookCard.appendChild(descriptionList);
        main.appendChild(bookCard);
    }
}

function openAddBookModal() {
    addBookModal.showModal();
}

addBookBtn.addEventListener('click', openAddBookModal);

// addBookBtn.addEventListener('click', () => {

//     let newBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Read');
//     addBookToCase(newBook);
//     populateBookCase();
// });
