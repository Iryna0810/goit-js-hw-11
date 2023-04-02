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
loadMoreBtnEl.classList.add('is-hidden');

const hideElement = (totalPages, page) => {
    if (totalPages === page || totalPages === 0) {
         DOMEl.classList.add('is-hidden');
                return;
    }
}

async function handleSearchFormSubmit(event) {
    event.preventDefault();

    const inputEl = event.target.searchQuery;

    try {
            if (inputEl.value === '') {
        return;
    }

    pixabayApi.query = inputEl.value.trim();

        inputEl.value = '';
        
        const { data } = await pixabayApi.fetchPhoto();
        
        if (!data.hits.length) {
            console.log('Images not found');
            return;
        }

        galleryListEl.innerHTML = createGalleryCard(data.hits);
        loadMoreBtnEl.classList.remove('is-hidden');
        
    } catch (error) {
        console.log(error);
    }
};

const handleLoadMoreBtnClick = async () => {
    pixabayApi.page += 1;
    const { data } = pixabayApi.fetchPhoto();

    if (data.hits.length === 0) {
        loadMoreBtnEl.classList.add('is-hidden');
        return;
    }

    galleryListEl.insertAdjacentHTML('beforeend', createGalleryCard(data.hits));
    }

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);



