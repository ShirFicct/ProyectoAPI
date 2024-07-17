const publicKey = '6882f9fbe2e5dfaaf33fbc92217abcdd';
const privateKey = 'a1f0e647a1bd7fe3b0412478730c0bc6fa067fc9';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

document.getElementById('connectionForm').addEventListener('submit', function (event) {
    event.preventDefault();
    showCorrespondingHeroes();
});

function showCorrespondingHeroes() {
    const name = document.getElementById('name').value;
    const apiURL = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&apikey=${publicKey}&ts=${ts}&hash=${hash}`;
    console.log(apiURL);

    fetch(apiURL)
        .then((res) => res.json())
        .then((json) => {
            displayCharacters(json.data.results);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

function displayCharacters(characters) {
    const cardsGroup = document.getElementById('cards-group');
    cardsGroup.innerHTML = ''; // Limpiar el contenedor

    characters.forEach(character => {
        const url = character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : 'path/to/default/image.jpg';
        const name = character.name;
        const description = character.description ;

        const cardHTML = `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${url}" alt="${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>`;
        cardsGroup.innerHTML += cardHTML;
    });
}
