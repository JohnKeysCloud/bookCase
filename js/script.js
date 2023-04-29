const bookCase = document.getElementById('bookcase');
const addBookModal = document.querySelector('dialog');

// * buttons
const menuBtn = document.getElementById('menu-btn');
const addBookBtn = document.getElementById('add-book-btn');
const openDialogBtn = document.getElementById('modal-open-btn');
const searchCloseBtn = document.getElementById('search-close-btn');
const searchSubmitBtn = document.getElementById('search-submit-btn');
const modalCloseBtn = document.getElementById('modal-close-btn');

// * forms & inputs 
const addBookForm = document.getElementById('add-book-form');
const authorInput = document.getElementById('author');
const bookCoverInput = document.getElementById('book-cover');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const titleInput = document.getElementById('title');

// * created elements
const bookCaseEmptyDiv = document.createElement('div');
const bookCaseEmptyDivP = document.createElement('p');
const bookCaseEmptyDivP2 = document.createElement('p');
const selectedOptionDiv = document.createElement('div');

const selectContainers = document.getElementsByClassName('custom-select');
const today = new Date().toLocaleDateString();

let bookCaseArray = [];
function Book(title, author, pages, read, cover) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.dateAdded = this.dateAdded || today;
    this.cover = cover;
}

Book.prototype.toggleReadStatus = function () {
    this.read === false ? (this.read = true) : (this.read = false);
};

function addEventListeners() {
    const readToggleBtns = document.querySelectorAll('.book-card-btn:first-of-type');
    const removeBookBtns = document.querySelectorAll('.book-card-btn:nth-of-type(2)');
    const editBookBtns = document.querySelectorAll('.book-card-btn:nth-of-type(3)');
    
    for (let i = 0; i < readToggleBtns.length; ++i) {
        readToggleBtns[i].addEventListener('click', findBookObject);
        removeBookBtns[i].addEventListener('click', removeBookFromCase);
        editBookBtns[i].addEventListener('click', editBookInfo);
    }
}

function formatDate(dateAdded) {
    let dateAddedSplit = dateAdded.split('/');
    [dateAddedSplit[0], dateAddedSplit[1], dateAddedSplit[2]] = [dateAddedSplit[2], dateAddedSplit[0], dateAddedSplit[1]];
    let dateAddedFormatted = dateAddedSplit.join('-');

    return dateAddedFormatted;
}

function populateBookCase() {
    bookCase.innerHTML = '';

    if (!sortSelect.value) bookCaseArray.sort((a, b) => formatDate(a.dateAdded) > formatDate(b.dateAdded) ? -1 : 1);

    bookCaseArray.forEach( book => {
        const bookCard = document.createElement('article');
        const bookImg = document.createElement('img');
        const bookImgDefaultSource = 'assets/images/book-case/no-image-placeholder.svg';
        const bookImgWrapper = document.createElement('div');
        const bottomBookCardDiv = document.createElement('div');
        const changeReadStatus = document.createElement('button');
        const dateAddedDiv = document.createElement('div');
        const dateTime = document.createElement('time');
        const descriptionList = document.createElement('dl');
        const descriptionWrapper = document.createElement('div');
        const removeBookBtn = document.createElement('button');
        const editBookBtn = document.createElement('button');

        const dateAdded = book.dateAdded;
        const dateAddedFormatted = formatDate(dateAdded);
        
        book.dateAdded = dateAdded;

        dateTime.textContent = book.dateAdded;
        dateTime.setAttribute('date-time', dateAddedFormatted);

        dateAddedDiv.classList.add('date-added-div');
        dateAddedDiv.innerHTML = '<span class="bold">Date added:</span> ';
        dateAddedDiv.appendChild(dateTime);
        
        bookImgWrapper.classList.add('bookcase-cover-img-wrapper');
        bookImg.classList.add('bookcase-cover-img');
        changeReadStatus.classList.add('book-card-btn');
        descriptionList.classList.add('description-list');
        descriptionWrapper.classList.add('description-wrapper');
        bottomBookCardDiv.classList.add('bottom-book-card-div');
        removeBookBtn.classList.add('book-card-btn');
        editBookBtn.classList.add('book-card-btn');

        bookImg.src = book.cover || bookImgDefaultSource;

        const descriptionListFragment = document.createDocumentFragment();
        for (info in book) {
            if (info === 'cover' || info === 'toggleReadStatus' || info === 'dateAdded') continue;
        
            const description = document.createElement('dd');
            const descriptionDiv = document.createElement('div');
            const descriptionTerm = document.createElement('dt');

            description.classList.add('description');
            descriptionDiv.classList.add('description-div');
            descriptionTerm.classList.add('accessibility');
            descriptionTerm.textContent = info;

            switch (info) {
                case 'title':
                    description.innerHTML = `<span class="book-info bookcase-title">${book.title}</span>`;
                    break;
                case 'author':
                    description.innerHTML = `by <span class="book-info bookcase-author-name">${book.author}</span>`;
                    break;
                case 'pages':
                    description.innerHTML = `<span class="book-info bookcase-page-amount">${book.pages}</span> pages`;
                    break;
                case 'read':
                    description.innerHTML = book.read === true
                        ? '<span class="bold bookcase-read-status">Status:</span> Read'
                        : '<span class="bold bookcase-read-status">Status:</span> Unread';
                    break;
                default:
                    description.textContent = book[info];
            }

            if (book.read) {
                changeReadStatus.style.background = '#465A3C';
                changeReadStatus.textContent = 'Mark as Unread';
            } else {
                changeReadStatus.style.background = '#E56D4B';
                changeReadStatus.textContent = 'Mark as Read';
            }
            
            removeBookBtn.textContent = 'Remove';
            editBookBtn.textContent = 'Edit Book';
            
            descriptionDiv.append(descriptionTerm, description);
            descriptionListFragment.appendChild(descriptionDiv);
            descriptionList.appendChild(descriptionListFragment);
        }

        bookImgWrapper.appendChild(bookImg);
        descriptionWrapper.append(bookImgWrapper, descriptionList);
        bookCard.appendChild(descriptionWrapper);
        bottomBookCardDiv.append(changeReadStatus, removeBookBtn, editBookBtn, dateAddedDiv);
        bookCard.appendChild(bottomBookCardDiv);
        bookCard.classList.add('book-card');

        bookCase.appendChild(bookCard);
    });
    
    addEventListeners();   

    bookCaseArray.length > 0
        ? localStorage.setItem('bookCaseArray', JSON.stringify(bookCaseArray))
        : localStorage.removeItem('bookCaseArray');
}

function findBookObject() {
    let targetedBookTitle = this.parentNode.parentNode.querySelector('.bookcase-title').textContent;

    for (let i = 0; i < bookCaseArray.length; i++) {
        if (bookCaseArray[i].title === targetedBookTitle) {
            bookCaseArray[i].toggleReadStatus();
        }
    }

    populateBookCase();
}

function appendEmptyBookCaseContent() {
    if (bookCaseArray.length !== 0) return;
    bookCaseEmptyDiv.setAttribute('id', 'bookcase-empty');
    bookCaseEmptyDivP.classList.add('no-select');
    bookCaseEmptyDivP.innerHTML = 'your bookcase is empty<span id="bookcase-empty-periods">...</span> read a book ♡';
    bookCaseEmptyDivP2.classList.add('no-select');
    bookCaseEmptyDivP2.innerHTML = '<span class="add-symbol">⨭</span> Click to Add';
    bookCaseEmptyDiv.append(bookCaseEmptyDivP, bookCaseEmptyDivP2);
        
    bookCase.append(bookCaseEmptyDiv);
}

function editBookInfo() {
    const bookInfoPseudoInputs = this.parentNode.parentNode.querySelectorAll('.book-info');
    const targetedBookTitle = this.parentNode.parentNode.querySelector('.bookcase-title').textContent;
    const targetedBook = bookCaseArray.find(book => book.title === targetedBookTitle);
    
    if (this.textContent === 'Save Changes') {        
        bookInfoPseudoInputs.forEach(info => info.setAttribute('contenteditable', 'false'));
        this.textContent = 'Edit Book';
        populateBookCase();
        return;
    }

    for (let i = 0; i < bookInfoPseudoInputs.length; i++) {
        bookInfoPseudoInputs[i].addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.click();                
            }
        });

        bookInfoPseudoInputs[i].addEventListener('input', () => {
            if (bookInfoPseudoInputs[i].classList.contains('bookcase-title')) {
                targetedBook.title = bookInfoPseudoInputs[i].textContent;
            } else if (bookInfoPseudoInputs[i].classList.contains('bookcase-author-name')) {
                targetedBook.author = bookInfoPseudoInputs[i].textContent;
            } else if (bookInfoPseudoInputs[i].classList.contains('bookcase-page-amount')) {
                targetedBook.pages = bookInfoPseudoInputs[i].textContent;
            }
        });
    }

    this.textContent = 'Save Changes';
    bookInfoPseudoInputs.forEach(info => info.setAttribute('contenteditable', 'true'));
}

function removeBookFromCase() {
    let targetedBookTitle = this.parentNode.parentNode.querySelector('.bookcase-title').textContent;
    let targetedBookObject = bookCaseArray.find(book => book.title === targetedBookTitle);

    for (let i = 0; i < bookCaseArray.length; i++) {
        if (bookCaseArray[i].title !== targetedBookObject.title) continue;
        bookCaseArray.splice(i, 1);
    }

    populateBookCase();
    appendEmptyBookCaseContent();
}

function closeAddBookModal() {
    addBookModal.classList.toggle('is-hidden');
    addBookModal.close();
    addBookForm.reset();
    addBookModal.removeEventListener('animationend', closeAddBookModal);
}

function animateModalClose() {
    addBookModal.classList.toggle('is-hidden');
    addBookModal.addEventListener('animationend', closeAddBookModal);
}

function initializeNewBook(e) {
    e.preventDefault();

    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked, bookCoverInput.value);
    bookCaseArray.push(newBook);

    populateBookCase();
    animateModalClose();
}

function openAddBookModal() {
    addBookModal.showModal();
}

function closeSearchInput(e) {
    searchInput.value = '';
}

function applySorting() {
    let sortSelectValue = sortSelect.options[sortSelect.selectedIndex].value;

    switch (sortSelectValue) {
        case 'title':
            bookCaseArray.sort((a, b) => a.title < b.title ? -1 : 1);
            break;
        case 'author':
            bookCaseArray.sort((a, b) => a.author < b.author ? -1 : 1);
            break;
        case 'pages':
            bookCaseArray.sort((a, b) => +a.pages > +b.pages ? -1 : 1);
            break;
        case 'unread':
            bookCaseArray.sort((a) => a.read === false ? -1 : 1);
            break;
        default:
            console.log('hi');
            bookCaseArray.sort((a, b) => formatDate(a.dateAdded) < formatDate(b.dateAdded) ? -1 : 1);
    } 

    populateBookCase();
}

function checkSortPossibility() {
    if (bookCaseArray.length === 0) {
        alert('Your bookcase is empty though… How? 🤔');
        return false
    } else if (bookCaseArray.length === 1) {
        alert('You can\'t sort one book… you silly goose 🤓');
        return false
    } else {
        return true;
    } 
}

// ! break this up and refactor?
function initializeSelectElements() { 
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
                
                if (!checkSortPossibility()) return;

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
                applySorting();
            });

            optionsListItem.addEventListener('keydown', function (e) {
                // ? prevents scrolling when using arrow keys & also allows for using enter key to select an option
                e.preventDefault();

                if (e.key === 'Enter') {
                    this.click();
                }
        
                if (e.key === 'ArrowDown') {
                    if (!this.nextSibling) return;
                    this.nextSibling.focus();
                }

                if (e.key === 'ArrowUp') {
                    if (!this.previousSibling) {
                        this.parentNode.previousSibling.focus();
                        return;
                    };
                    this.previousSibling.focus();
                }
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
        // ? prevents scrolling when using arrow keys & also allows for using enter key to select an option
        if (e.key !== 'Tab') e.preventDefault(); 

        // ? if select arrow is active, close the select box and tab to the next element
        if (e.key === 'Tab' && this.classList.contains('select-arrow-active')) {
            this.click();
            this.nextSibling.firstChild.focus();
        }
        
        if (e.key === 'Enter') this.click();
        
        if (e.key === 'ArrowDown') this.nextSibling.firstChild.focus();
    });
}

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

function loadLocalStorage() {
    if (localStorage.getItem('bookCaseArray')) {
        bookCaseArray = JSON.parse(localStorage.getItem('bookCaseArray'));

        for (let i = 0; i < bookCaseArray.length; ++i) {
            bookCaseArray[i] = Object.assign(new Book(), bookCaseArray[i]);
        }

        populateBookCase();
    } else {
        appendEmptyBookCaseContent();
    }
}

function search() {
    let searchValue = searchInput.value.toLowerCase();
    let bookCards = document.querySelectorAll('.book-card');

    for (let i = 0; i < bookCaseArray.length; ++i) {
        let bookTitle = bookCaseArray[i].title.toLowerCase();
        let bookAuthor = bookCaseArray[i].author.toLowerCase();

        if (bookTitle.includes(searchValue) || bookAuthor.includes(searchValue)) {
            bookCards[i].style.display = 'block';
        } else {
            bookCards[i].style.display = 'none';
        }
    }
}

// ! Fix this
searchInput.addEventListener('keyup', search);

// ? if the user clicks anywhere outside the select box, then close all select boxes:
document.addEventListener('click', closeAllSelect);
openDialogBtn.addEventListener('click', openAddBookModal);
searchCloseBtn.addEventListener('click', closeSearchInput);
modalCloseBtn.addEventListener('click', animateModalClose);
addBookBtn.addEventListener('click', initializeNewBook);
bookCaseEmptyDiv.addEventListener('click', openAddBookModal);

// * one offs
menuBtn.addEventListener('click', () => menuBtn.classList.toggle('open'));
searchSubmitBtn.addEventListener('focus', () => {
    searchInput.style.display = 'block';
});

initializeSelectElements();
loadLocalStorage();