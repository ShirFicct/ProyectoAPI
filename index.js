// Tus credenciales de la API de Marvel
const publicKey = '6882f9fbe2e5dfaaf33fbc92217abcdd';
const privateKey = 'a1f0e647a1bd7fe3b0412478730c0bc6fa067fc9';
const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

console.log('ts:', ts);

// URL de la API de Marvel
//                                              /v1 desde aqui hasta antes de ? poner la ubicacion lo demas no se cambia 
//const apiURL = `https://gateway.marvel.com:443/v1/public/stories?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
const apiURL = `https://gateway.marvel.com/v1/public/stories?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
// una vez puesto el enlace ir a la web y copiar el enlace que muestra  consol.log y copiar a Insomnia o Postman para ver los datos
console.log('apiURL:', apiURL);

// Función para generar hash md5
function md5(value) {
    return CryptoJS.MD5(value).toString();
}

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
        dataItem.innerHTML = `
            <h2>${item.title}</h2>
            <p>${item.id}
            ${item.nombre}
            </p>
        `;
        dataContainer.appendChild(dataItem);
    });
}

// Llamar a la función fetchData cuando la página cargue
window.onload = fetchData;