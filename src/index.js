import Notiflix from 'notiflix';
import { PixabayAPI } from './fetch_img';
import createGalleryCard from './gallery_list.hbs'

// const searchInputEl = document.querySelector('.search-input');
const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryListEl = document.querySelector('.gallery');

console.log(searchFormEl);
console.log(loadMoreBtnEl);
console.log(galleryListEl);

const pixabayApi = new PixabayAPI;


const hideElement = (totalPages, page) => {
    if (totalPages === page || totalPages === 0) {
         DOMEl.classList.add('is-hidden');
                return;
    }
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    const inputEl = event.target.searchQuery;

    if (inputEl.value === '') {
        return;
    }

    pixabayApi.query = inputEl.value.trim();

    inputEl.value = '';

    const searchPhoto = pixabayApi.fetchPhoto();

    searchPhoto
        .then(({data}) => {
            galleryListEl.innerHTML = createGalleryCard(data.hits)
        }

    )


}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);



