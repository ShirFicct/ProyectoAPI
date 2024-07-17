const publicKey = '6882f9fbe2e5dfaaf33fbc92217abcdd';
const privateKey = 'a1f0e647a1bd7fe3b0412478730c0bc6fa067fc9';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const marvel = {
    render: () => {
        const apiURL = `https://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${ts}&hash=${hash}`;

        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(apiURL)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                for (const story of json.data.results) {
                    // Obtener la imagen del primer cómic asociado
                    const comic = story.comics.items[0];
                    let url = 'path/to/default/image.jpg'; // Imagen por defecto
                    if (comic) {
                        const comicId = comic.resourceURI.split('/').pop(); // Extraer el ID del cómic
                        fetch(`https://gateway.marvel.com/v1/public/comics/${comicId}?apikey=${publicKey}&ts=${ts}&hash=${hash}`)
                            .then((res) => res.json())
                            .then((comicJson) => {
                                if (comicJson.data.results.length > 0) {
                                    const comicData = comicJson.data.results[0];
                                    if (comicData.thumbnail) {
                                        url = `${comicData.thumbnail.path}.${comicData.thumbnail.extension}`;
                                    }
                                }
                                const title = story.title;
                                const description = story.description ;
                                const series = story.series.items.map((item) => item.name).join(', ');
                                const comics = story.comics.items.map((item) => item.name).join(', ');
                                const originalIssue = story.originalIssue ? story.originalIssue.name : 'No original issue available';

                                contentHTML += `
                                    <div class="col-md-4">
                                        <div class="card mb-4 shadow-sm">
                                            <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${url}" alt="${title}">
                                            <div class="card-body">
                                                <h5 class="card-title">${title}</h5>
                                                <p class="card-text">${description}</p>
                                                <p class="card-text"><strong>Series:</strong> ${series}</p>
                                                <p class="card-text"><strong>Comics:</strong> ${comics}</p>
                                                <p class="card-text"><strong>Original Issue:</strong> ${originalIssue}</p>
                                            </div>
                                        </div>
                                    </div>`;
                                container.innerHTML = contentHTML;
                            });
                    } else {
                        const title = story.title;
                        const description = story.description || 'No description available';
                        const series = story.series.items.map((item) => item.name).join(', ');
                        const comics = story.comics.items.map((item) => item.name).join(', ');
                        const originalIssue = story.originalIssue ? story.originalIssue.name : 'No original issue available';

                        contentHTML += `
                            <div class="col-md-4">
                                <div class="card mb-4 shadow-sm">
                                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${url}" alt="${title}">
                                    <div class="card-body">
                                        <h5 class="card-title">${title}</h5>
                                        <p class="card-text">${description}</p>
                                        <p class="card-text"><strong>Series:</strong> ${series}</p>
                                        <p class="card-text"><strong>Comics:</strong> ${comics}</p>
                                        <p class="card-text"><strong>Original Issue:</strong> ${originalIssue}</p>
                                    </div>
                                </div>
                            </div>`;
                        container.innerHTML = contentHTML;
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
};

marvel.render();


































/* Tus credenciales de la API de Marvel
const publicKey = '6882f9fbe2e5dfaaf33fbc92217abcdd';
const privateKey = 'a1f0e647a1bd7fe3b0412478730c0bc6fa067fc9';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

console.log('ts:', ts);

// URL de la API de Marvel
//                                              /v1 desde aqui hasta antes de ? poner la ubicacion lo demas no se cambia 
//const apiURL = `https://gateway.marvel.com:443/v1/public/stories?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
//const apiURL = `https://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
// una vez puesto el enlace ir a la web y copiar el enlace que muestra  consol.log y copiar a Insomnia o Postman para ver los datos
//console.log('apiURL:', apiURL);

// URL de la API de Marvel (usando tus claves y hash)
const apiURL = 'https://gateway.marvel.com/v1/public/stories?apikey=6882f9fbe2e5dfaaf33fbc92217abcdd&ts=1721102690164&hash=e711a54b2616d5bbe682f8c83866e80f';

// Función para obtener los datos de la API
async function fetchData() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        displayData(data.data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Función para mostrar los datos en el DOM
function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // Limpiar el contenedor

    data.forEach(item => {
        const dataItem = document.createElement('div');
        dataItem.classList.add('data-item');

        // Aquí personalizamos cómo mostrar los datos
        dataItem.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.description || 'No description available'}</p>
            ${item.thumbnail ? `<img src="${item.thumbnail.path}.${item.thumbnail.extension}" alt="${item.title}">` : ''}
            <p><strong>Series:</strong> ${item.series.items.map(series => series.name).join(', ')}</p>
            <p><strong>Comics:</strong> ${item.comics.items.map(comic => comic.name).join(', ')}</p>
            <p><strong>Original Issue:</strong> ${item.originalIssue.name}</p>
        `;

        dataContainer.appendChild(dataItem);
    });
}

// Llamar a la función fetchData cuando la página cargue
window.onload = fetchData;
*/