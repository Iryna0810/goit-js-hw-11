import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './fetch_img';
import createGalleryCard from './gallery_list.hbs';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const searchFormEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryListEl = document.querySelector('.gallery');

console.log(searchFormEl);
console.log(loadMoreBtnEl);
console.log(galleryListEl);

const pixabayApi = new PixabayAPI;
loadMoreBtnEl.classList.add('is-hidden');

    let lightbox = new SimpleLightbox(".gallery a", {
     captionSelector: 'img', 
     captionsData: 'alt',
     captionPosition: 'bottom',
     captionDelay: 250,
     scrollZoom: false,
}); 

async function handleSearchFormSubmit(event) {
    event.preventDefault();

    pixabayApi.page = 1;

    const inputEl = event.target.searchQuery;

    clearField();

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
        
        Notify.info(`Hooray! We found ${data.totalHits} images.`);

        galleryListEl.innerHTML = createGalleryCard(data.hits);

        lightbox.refresh();
        
        loadMoreBtnEl.classList.remove('is-hidden');
        
    } catch (error) {
        console.log(error);
    }
};

const handleLoadMoreBtnClick = async (event) => {
        
        try {

        pixabayApi.page += 1;
        
        const { data } = await pixabayApi.fetchPhoto();
      
        if (!data.hits.length) {
            loadMoreBtnEl.classList.add('is-hidden');
            return Notify.warning("We're sorry, but you've reached the end of search results");
            }
      
            galleryListEl.insertAdjacentHTML('beforeend', createGalleryCard(data.hits));
            
            lightbox.refresh();
            
    } catch (error) {
        console.log(error)
    }
}

function clearField() {
    galleryListEl.innerHTML = '';
}

    

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);



