import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

// const hideElement = (totalPages, page) => {
//     if (totalPages === page || totalPages === 0) {
//          DOMEl.classList.add('is-hidden');
//                 return;
//     }
// }

async function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log(event.target.searchQuery);
    const inputEl = event.target.searchQuery;

    try {
            if (inputEl.value === '') {
        return;
    }

    pixabayApi.query = inputEl.value.trim();

        inputEl.value = '';
        
        const { data } = await pixabayApi.fetchPhoto();
        
        if (!data.hits.length) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }

        galleryListEl.innerHTML = createGalleryCard(data.hits);
        loadMoreBtnEl.classList.remove('is-hidden');
        
    } catch (error) {
        console.log(error);
    }
};

const handleLoadMoreBtnClick = async (event) => {
    pixabayApi.page += 1;
    
    try {
        const { data } = await pixabayApi.fetchPhoto();

        if (!data.hits.length) {
            loadMoreBtnEl.classList.add('is-hidden');
            return;
        }

        galleryListEl.insertAdjacentHTML('beforeend', createGalleryCard(data.hits));
    } catch (error) {
        
    }
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);



