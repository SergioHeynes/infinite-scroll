
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photos = [];

// Set attributes to DOM elements
function setAttributes(element, attributes) {

    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }

}

// Create elements for links and photos, Add to DOM
function displayPhotos() {

    photos.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Put image inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);

    })

}


// Unsplash API
const count = 10;
const apiKey = 'eOjkLl2MudUkqdC2s-vKsMlCStFZbKymBv_QuaEYvfE';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

async function getPhotos() {
    try{
        const response = await fetch(apiUrl)
        photos = await response.json();
        console.log(photos)
        displayPhotos()
    }
    catch(error) {
        console.log(error)
    }
}

// On load
getPhotos();