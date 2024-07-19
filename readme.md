Proyecto de Integración de APIs: Marvel y The Movie

Descripción-
Este proyecto consiste en obtener datos de dos APIs (Marvel y The Movie) y manipularlos para mostrarlos en páginas web. Utilizando la API de Marvel, hemos diseñado un sitio web que muestra información sobre personajes, cómics, series y eventos de Marvel. Con la API de The Movie, hemos creado un sitio web que ofrece más de 15 géneros de películas.

Integrantes del Grupo:
-Wendy Huayhua Lopez
-Adriana Vargas
-Shirley Gutierrez
-Claudia Aviles

Requisitos:
Node.js (versión 20.15.0 o superior)
npm (gestor de paquetes de Node.js)
Cuenta de desarrollador para obtener las API keys de Marvel y The Movie

    Características del Proyecto:

-Sitio Web de Marvel:
Muestra información detallada sobre personajes, cómics, series y eventos.
Utiliza la API de Marvel para obtener datos actualizados y precisos.

-Sitio Web de The Movie:
Ofrece información sobre más de 15 géneros de películas.
Utiliza la API de The Movie para mostrar datos actualizados sobre las películas.

Ejemplo de uso de la API de Marvel

const fetch = require('node-fetch');

const marvelApiKey = process.env.MARVEL_API_KEY;
const url = https://gateway.marvel.com/v1/public/characters?apikey=${marvelApiKey};

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

Ejemplo de uso de la API de The Movie
const fetch = require('node-fetch');

const movieApiKey = process.env.THE_MOVIE_API_KEY;
const url = https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey};

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


Contribuir
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del proyecto.
Crea una nueva rama (git checkout -b feature/nueva-feature).
Realiza tus cambios y haz commit (git commit -m 'Añadir nueva feature').
Haz push a la rama (git push origin feature/nueva-feature).
Abre una Pull Request.

Licencia
Este proyecto está licenciado bajo la Licencia MIT. Para más información, consulta el archivo LICENSE.