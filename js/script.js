const body = document.body;
const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');
const addBookModal = document.querySelector('dialog');
const addBookBtn = document.getElementById('add-book-button');
const searchInput = document.getElementById('search-input');
const searchCloseBtn = document.getElementById('search-close-btn');
let bookCase = [];

// ! ---------------------------------------------------
// * REVIEW 

let selectContainers = document.getElementsByClassName('custom-select');

// ? look for any elements with the class "custom-select":
for (let i = 0; i < selectContainers.length; i++) {
    let selectElement = selectContainers[i].getElementsByTagName('select')[0];
    // ? for each element, create a new DIV that will contain the option list:
    let optionsList = document.createElement('ul');
    
    // ? for each element, create a new DIV that will act as the selected item:
    selectedOptionDiv = document.createElement('div');
    selectedOptionDiv.setAttribute("class", "select-selected");
    selectedOptionDiv.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
    selectContainers[i].appendChild(selectedOptionDiv);
    
    optionsList.setAttribute("class", "select-items select-hide");

    for (let j = 1; j < selectElement.length; j++) {
        // ? for each option in the original select element, create a new DIV that will act as an option item:
        let optionsListItem = document.createElement("li");
        optionsListItem.innerHTML = selectElement.options[j].innerHTML;

        optionsListItem.addEventListener("click", function(e) {
            // ? when an item is clicked, update the original select box, and the selected item:
            let currentSelectedLiElem = this.parentNode.getElementsByClassName("same-as-selected");
            let listItemParent = this.parentNode.parentNode.getElementsByTagName("select")[0];
            let currentSelectedDiv = this.parentNode.previousSibling;

            for (let i = 0; i < listItemParent.length; i++) {
                if (listItemParent.options[i].innerHTML === this.innerHTML) {
                    listItemParent.selectedIndex = i;
                    currentSelectedDiv.innerHTML = this.innerHTML;
                    
                    for (let k = 0; k < currentSelectedLiElem.length; k++) {
                        currentSelectedLiElem[k].removeAttribute('class');
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            currentSelectedDiv.click();
        });
        optionsList.appendChild(optionsListItem);
    }
    selectContainers[i].appendChild(optionsList);

    selectedOptionDiv.addEventListener("click", function(e) {
        // ? when the select box is clicked, close any other select boxes, and open/close the current select box:*
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(currentSelectedDivOption) {
    // ? a function that will close all select boxes in the document, except the current select box:
    var arrNo = [];
    let customSelectULs = document.getElementsByClassName("select-items");
    let allSelectedDivOptions = document.getElementsByClassName("select-selected");

    for (let i = 0; i < allSelectedDivOptions.length; i++) {
        if (currentSelectedDivOption === allSelectedDivOptions[i]) {
            arrNo.push(i)
        } else {
            allSelectedDivOptions[i].classList.remove("select-arrow-active");
        }
    }

    for (let i = 0; i < customSelectULs.length; i++) {
        if (arrNo.indexOf(i)) {
        customSelectULs[i].classList.add("select-hide");
        }
    }
}
// ? if the user clicks anywhere outside the select box, then close all select boxes:
document.addEventListener("click", closeAllSelect);

// ! ---------------------------------------------------

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

function closeSearchInput() {
    searchInput.value = '';
}

addBookBtn.addEventListener('click', openAddBookModal);
searchCloseBtn.addEventListener('click', closeSearchInput);

// addBookBtn.addEventListener('click', () => {

//     let newBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Read');
//     addBookToCase(newBook);
//     populateBookCase();
// });