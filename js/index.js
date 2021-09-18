//ELEMENTS
const btnHome = document.querySelectorAll(".side-nav__link")[0];
const btnForm = document.querySelectorAll(".side-nav__link")[1];
const sidebar = document.querySelector(".sidebar");
const searchInput = document.querySelector(".search__input");
const btnSubmit = document.querySelector(".form__submit");

const cards = document.querySelector(".card-wrapper");
//modal
const modalContainer = document.querySelector(".modal-container");
const modalInner = document.querySelector(".modal__inner");
const btnModalClose = document.querySelector(".modal__close");

//modal

//Form
const form = document.querySelector(".form");
const inputTitle = document.querySelector(".form__text-input");
const inputText = document.querySelector(".form__text-area");
const inputImage = document.querySelector(".form__load-image");

//Form


//VARIABLES
const dataSource = "https://jsonplaceholder.typicode.com/posts";

//FUNCTIONS

const clearInputs = function () {
    inputTitle.value = inputText.value = inputImage.value = "";
}

let sectionShown = "cards";
const switchView = function (e) {
    e.preventDefault();
    e.stopPropagation();
    //Sidebar reaction

    //To shown element
    let toShownAttr = e.currentTarget.getAttribute('data-target');

    if (sectionShown !== toShownAttr) {
        [...e.currentTarget.parentElement.parentElement.children].forEach(node => node.classList.remove("side-nav__item--active"));
        e.currentTarget.parentElement.classList.add("side-nav__item--active");

        document.querySelector(`.${toShownAttr}`).classList.remove("d-none");
        document.querySelector(`.${sectionShown}`).classList.add("d-none");
    }
    clearInputs();
    sectionShown = toShownAttr;
}

const initCards = function (data) {
    let cardHTML = "";

    data.forEach((element, i) => {
        cardHTML += `<div class="card">
        <div class="card__image-box">
            <img class="card__image" alt="Card Image" src="https://picsum.photos/300/100?random=${i}">
        </div>
        <div class="card__block">
            <h2 class="card__title">${element.title}</h2>
            <p class="card__text">${element.body}</p>
        </div>
    </div>`;
    });

    cards.innerHTML = cardHTML;
}

const load = function (url) {
    fetch(url)
        .then(response => response.json())
        .then(data => initCards(data.slice(0, 10)));
}

let sideBarStatus = "closed";
const sidebarCollapse = function (e) {

    if (sideBarStatus === "closed") {
        sidebar.classList.remove("sidebar--collapsed");
        sideBarStatus = "collapsed";
    }
    else {
        sidebar.classList.add("sidebar--collapsed");
        sideBarStatus = "closed";
    }
}

const displaySearchResults = function (data) {
    console.log(data.length);
    if (data.length > 0) {
        initCards(data);
    }
    else {
        cards.innerHTML = `<h2>Sonuç Bulunamadı<h2>`;
    }
}

const search = function (e, url) {
    const val = e.target.value.trim().toLowerCase();
    if (val !== "") {
        fetch(url)
            .then(response => response.json())
            .then(json => {
                displaySearchResults(json.filter(x => x.title.includes(val)).slice(0, 10));
            });
    }
}

const displayFormModal = function (obj) {
    if (!!obj) {
        modalInner.innerHTML = `<h3 class="modal__title">
           ${obj.title}
        </h3>
        <p class="modal__text">${obj.text}</p>`;
        modalContainer.style.display = "flex";
    }
    else {
        return false;
    }
}

const submitForm = function (e) {
    e.preventDefault();
    let image = inputImage.value.trim();
    let text = inputText.value.trim();
    let title = inputTitle.value.trim();
    if (text && title) {
        clearInputs();
        displayFormModal({
            text: text,
            title: title
        });
    }
    else {
        clearInputs();
        return false;
    }
}


//EVENT LISTENERS
btnHome.addEventListener("click", switchView)
btnForm.addEventListener("click", switchView)
btnForm.addEventListener("DOMContentLoaded", load(dataSource));
sidebar.addEventListener("mouseenter", sidebarCollapse);
sidebar.addEventListener("mouseleave", sidebarCollapse);
searchInput.addEventListener("keyup", function (e) {
    e.preventDefault();
    e.stopPropagation();
    search(e, dataSource);
});
form.addEventListener("submit", submitForm);
btnModalClose.addEventListener("click", function () {
    modalContainer.style.display = "none";
})