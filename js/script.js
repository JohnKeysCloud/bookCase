const body = document.body;
const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');
const addBookModal = document.querySelector('dialog');
const openDialogBtn = document.getElementById('open-dialog-btn');
const addBookBtn = document.getElementById('add-book-btn');
const addBookForm = document.getElementById('add-book-form');
const searchInput = document.getElementById('search-input');
const searchCloseBtn = document.getElementById('search-close-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');
const bookCase = document.getElementById('book-case');

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');

let bookCaseArray = [];

const menuBtn = document.querySelector('#menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    if (!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
}); 

// ! ---------------------------------------------------
// * REVIEW 

let selectContainers = document.getElementsByClassName('custom-select');
let selectedOptionDiv = document.createElement('div');

// ? look for any elements with the class 'custom-select':
for (let i = 0; i < selectContainers.length; i++) {
    let selectElement = selectContainers[i].getElementsByTagName('select')[0];
    // ? for each element, create a new DIV that will contain the option list:
    let optionsList = document.createElement('ul');
    
    // ? for each element, create a new DIV that will act as the selected item:
    selectedOptionDiv.setAttribute('class', 'select-selected');
    selectedOptionDiv.setAttribute('tabindex', '0');

    selectedOptionDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    selectContainers[i].appendChild(selectedOptionDiv);
    
    optionsList.setAttribute('class', 'select-items select-hide');

    for (let j = 1; j < selectElement.length; j++) {
        // ? for each option in the original select element, create a new DIV that will act as an option item:
        let optionsListItem = document.createElement('li');
        optionsListItem.setAttribute('tabindex', '0');
        optionsListItem.innerHTML = selectElement.options[j].innerHTML;

        optionsListItem.addEventListener('click', function(e) {
            // ? when an item is clicked, update the original select box, and the selected item:
            let currentSelectedLiElem = this.parentNode.getElementsByClassName('same-as-selected');
            let listItemParent = this.parentNode.parentNode.getElementsByTagName('select')[0];
            let currentSelectedDiv = this.parentNode.previousSibling;

            for (let i = 0; i < listItemParent.length; i++) {
                if (listItemParent.options[i].innerHTML === this.innerHTML) {
                    listItemParent.selectedIndex = i;
                    currentSelectedDiv.innerHTML = this.innerHTML;
                    
                    for (let k = 0; k < currentSelectedLiElem.length; k++) {
                        currentSelectedLiElem[k].removeAttribute('class');
                    }
                    this.setAttribute('class', 'same-as-selected');
                    break;
                }
            }
            currentSelectedDiv.click();
        });
        optionsList.appendChild(optionsListItem);
    }
    selectContainers[i].appendChild(optionsList);

    selectedOptionDiv.addEventListener('click', function(e) {
        // ? when the select box is clicked, close any other select boxes, and open/close the current select box:*
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });
}

selectedOptionDiv.addEventListener('keydown', function (e) {
    console.log(e.key);
    if (e.key === 'Enter' && document.activeElement === selectedOptionDiv) {
        this.click();
    }

    // ! add keydown event listener to each li => goes to next sibling => enter simulates click
    
    if (e.key === 'ArrowDown') {
        console.log(this.nextSibling.firstChild);
        this.nextSibling.firstChild.focus();
    }
});

function closeAllSelect(currentSelectedDivOption) {
    // ? a function that will close all select boxes in the document, except the current select box:
    var arrNo = [];
    let customSelectULs = document.getElementsByClassName('select-items');
    let allSelectedDivOptions = document.getElementsByClassName('select-selected');

    for (let i = 0; i < allSelectedDivOptions.length; i++) {
        if (currentSelectedDivOption === allSelectedDivOptions[i]) {
            arrNo.push(i)
        } else {
            allSelectedDivOptions[i].classList.remove('select-arrow-active');
        }
    }

    for (let i = 0; i < customSelectULs.length; i++) {
        if (arrNo.indexOf(i)) {
        customSelectULs[i].classList.add('select-hide');
        }
    }
}
// ? if the user clicks anywhere outside the select box, then close all select boxes:
document.addEventListener('click', closeAllSelect);

// ! ---------------------------------------------------

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToCase(book) {
    bookCaseArray.push(book);
}

function removeBookFromCase(book) {
    bookCaseArray.splice(bookCaseArray.indexOf(book), 1);
}

function populateBookCase(e) {
    e.preventDefault();
    let newBook = new Book(title.value, author.value, pages.value, read.checked);
    addBookToCase(newBook);

    let bookCard = document.createElement('article');
    let descriptionList = document.createElement('dl');
    let bookTitle = document.createElement('dt');
    let bookAuthor = document.createElement('dt');
    let bookPages = document.createElement('dt');
    let bookRead = document.createElement('dt');
    let removeBookBtn = document.createElement('button');

    for (let i = 0; i < bookCaseArray.length; i++) {
        console.log(bookCaseArray[i]);

        bookTitle.textContent = `Title: ${newBook.title}`;
        bookAuthor.textContent = `Author: ${newBook.author}`;
        bookPages.textContent = `Pages: ${newBook.pages}`;
        bookRead.textContent = `Read: ${newBook.read}`;

        descriptionList.appendChild(bookTitle);
        descriptionList.appendChild(bookAuthor);
        descriptionList.appendChild(bookPages);
        descriptionList.appendChild(bookRead);

        bookCard.appendChild(descriptionList);
        bookCase.appendChild(bookCard);

        bookCard.classList.add('book-card');
    }


    // get all the text input values 
    // create a new book object
    // add the book object to the bookcase array
    // populate the bookcase with the book object
    // clear the form
    // close the modal
    addBookForm.reset()
    addBookModal.close();
}

function openAddBookModal() {
    addBookModal.showModal();
}

function closeSearchInput(e) {
    searchInput.value = '';
}

function closeModal() {
    addBookModal.close();
}

openDialogBtn.addEventListener('click', openAddBookModal);
searchCloseBtn.addEventListener('click', closeSearchInput);
modalCloseBtn.addEventListener('click', closeModal);
addBookBtn.addEventListener('click', populateBookCase);