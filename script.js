
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];
let ready = false;
let totalImages = 0;
let imagesLoaded = 0;

// Unsplash API
let count = 5;
const apiKey = 'eOjkLl2MudUkqdC2s-vKsMlCStFZbKymBv_QuaEYvfE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all image where loaded
function imageLoaded() {
    imagesLoaded ++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}

// Set attributes to DOM elements
function setAttributes(element, attributes) {

    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }

}

// Create elements for links and photos, Add to DOM
function displayPhotos() {

    totalImages = photos.length;
    imagesLoaded = 0;

    photos.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put image inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    })

}


async function getPhotos() {
    try{
        const response = await fetch(apiUrl)
        photos = await response.json();
        displayPhotos()
    }
    catch(error) {
        console.log(error)
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On load
getPhotos();