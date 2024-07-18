// Constantes para la API
const API_KEY = "api_key=c0136c4e01eef5ec1c99836f82a7331c"; // Clave de la API para acceder a los datos
const BASE_URL = "https://api.themoviedb.org/3"; // URL base de la API de The Movie Database (TMDb)
const API_URL = BASE_URL + "/discover/movie?" + API_KEY; // URL para descubrir películas con la API
const IMG_URL = "https://image.tmdb.org/t/p/w500"; // URL base para obtener las imágenes de las películas
const searchURL = BASE_URL + "/search/movie?" + API_KEY; // URL para buscar películas con la API

// Lista de géneros de películas con sus IDs
const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

// Elementos del DOM
const main = document.getElementById("main"); // Elemento principal donde se muestran las películas
const form = document.getElementById("form"); // Formulario de búsqueda
const search = document.getElementById("search"); // Input de búsqueda
const tagsEl = document.getElementById("tags"); // Elemento donde se muestran los géneros

const prev = document.getElementById("prev"); // Botón para ir a la página anterior
const next = document.getElementById("next"); // Botón para ir a la siguiente página
const current = document.getElementById("current"); // Elemento para mostrar la página actual

// Variables para el manejo de la paginación
var currentPage = 1; // Página actual
var nextPage = 2; // Siguiente página
var prevPage = 3; // Página anterior
var lastUrl = ""; // Última URL utilizada para la petición
var totalPages = 100; // Total de páginas disponibles

// Configuración inicial
let selectedGenre = []; // Lista de géneros seleccionados
setGenre(); // Establecer géneros y agregar event listeners

// Definición de funciones

// Función para establecer los géneros y agregar event listeners
function setGenre() {
  tagsEl.innerHTML = ""; // Limpiar el contenido de los tags
  genres.forEach((genre) => {
    const t = document.createElement("div"); // Crear un nuevo elemento div para cada género
    t.classList.add("tag"); // Agregar la clase 'tag' al div
    t.id = genre.id; // Establecer el id del div al id del género
    t.innerText = genre.name; // Establecer el texto del div al nombre del género
    t.addEventListener("click", () => {
      // Agregar un event listener al div para el evento 'click'
      if (selectedGenre.length === 0) {
        // Si no hay géneros seleccionados, agregar el género actual
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          // Si el género ya está seleccionado, quitarlo de la lista
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          // Si el género no está seleccionado, agregarlo a la lista
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre); // Imprimir los géneros seleccionados en la consola
      // Llamar a la función getMovies con la URL para obtener las películas con los géneros seleccionados
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      highlightSelection(); // Resaltar los géneros seleccionados
    });
    tagsEl.append(t); // Agregar el div al elemento de tags
  });
}

// Función para resaltar los géneros seleccionados
function highlightSelection() {
  const tags = document.querySelectorAll(".tag"); // Seleccionar todos los elementos con la clase 'tag'
  tags.forEach((tag) => {
    tag.classList.remove("highlight"); // Quitar la clase 'highlight' de cada tag
  });
  clearBtn(); // Crear o manejar el botón de limpiar
  if (selectedGenre.length != 0) {
    // Si hay géneros seleccionados, resaltar los géneros seleccionados
    selectedGenre.forEach((id) => {
      const highlightTag = document.getElementById(id);
      highlightTag.classList.add("highlight");
    });
  }
}

// Función para crear y manejar el botón de limpiar
function clearBtn() {
  let clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.classList.add("highlight"); // Resaltar el botón de limpiar si existe
  } else {
    let clear = document.createElement("div"); // Crear un nuevo elemento div para el botón de limpiar
    clear.classList.add("tag", "highlight"); // Agregar clases al div
    clear.id = "clear"; // Establecer el id del div a 'clear'
    clear.innerText = "clear x"; // Establecer el texto del div
    clear.addEventListener("click", () => {
      // Agregar un event listener al div para el evento 'click'
      selectedGenre = []; // Limpiar la lista de géneros seleccionados
      setGenre(); // Volver a establecer los géneros
      getMovies(API_URL); // Obtener las películas sin ningún filtro de género
    });
    tagsEl.append(clear); // Agregar el div al elemento de tags
  }
}
getMovies(API_URL); // Llamar a la función getMovies con la URL inicial

// Función para obtener las películas desde la API
async function getMovies(url) {
  lastUrl = url; // Guardar la URL utilizada para la petición
  try {
    const res = await fetch(url); // Hacer la petición a la URL proporcionada
    const data = await res.json(); // Convertir la respuesta en JSON
    console.log(data.results); // Imprimir los resultados de las películas en la consola
    if (data.results.length !== 0) {
      // Si hay resultados, mostrar las películas
      showMovies(data.results);
      currentPage = data.page; // Establecer la página actual
      nextPage = currentPage + 1; // Establecer la siguiente página
      prevPage = currentPage - 1; // Establecer la página anterior
      totalPages = data.total_pages; // Establecer el total de páginas

      current.innerHTML = currentPage; // Mostrar la página actual

      if (currentPage <= 1) {
        // Si la página actual es la primera, desactivar el botón anterior
        prev.classList.add("disabled");
        next.classList.remove("disabled");
      } else if (currentPage >= totalPages) {
        // Si la página actual es la última, desactivar el botón siguiente
        prev.classList.remove("disabled");
        next.classList.add("disabled");
      } else {
        // Activar ambos botones si no estamos en la primera o última página
        prev.classList.remove("disabled");
        next.classList.remove("disabled");
      }
      tags.scrollIntoView({ behavior: "smooth" }); // Desplazarse hacia los tags
    } else {
      main.innerHTML = `<h1 class="no-results">No Results Found</h1>`; // Mostrar mensaje si no se encuentran resultados
    }
  } catch (error) {
    console.error("Failed to fetch movies:", error); // Manejo de errores en la petición
  }
}

// Función para mostrar las películas en la página
function showMovies(data) {
  main.innerHTML = ""; // Limpiar el contenido actual
  data.forEach((movie) => {
    const { id, title, poster_path, vote_average, overview } = movie; // Desestructurar datos de cada película
    const movieEl = document.createElement("div"); // Crear un nuevo elemento div para cada película
    movieEl.classList.add("movie"); // Agregar la clase 'movie' al div
    movieEl.innerHTML = `
      <img src="${
        poster_path
          ? IMG_URL + poster_path
          : "http://via.placeholder.com/1080x1580"
      }" alt="${title}" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Descripción General</h3>  
        ${overview}
        <br/>
        <button class="know-more" id="${id}">Saber más</button>
      </div>
    `;
    main.appendChild(movieEl); // Agregar el div de la película al elemento principal

    document.getElementById(id).addEventListener("click", () => {
      console.log(id); // Imprimir el id de la película en la consola
      openNav(movie); // Llamar a la función openNav para abrir los detalles de la película
    });
  });
}

const overlayContent = document.getElementById("overlay-content");
/* Función para abrir el overlay cuando alguien hace clic en el botón */
async function openNav(movie) {
  let id = movie.id;
  try {
    const res = await fetch(BASE_URL + "/movie/" + id + "/videos?" + API_KEY); // Hacer una petición para obtener los videos de la película
    const videoData = await res.json(); // Convertir la respuesta en JSON
    console.log(videoData); // Imprimir los datos de los videos en la consola
    if (videoData) {
      document.getElementById("myNav").style.width = "100%"; // Abrir el overlay
      if (videoData.results.length > 0) {
        // Si hay videos, mostrarlos
        var embed = [];
        var dots = [];
        videoData.results.forEach((video, idx) => {
          let { name, key, site } = video;
          if (site == "YouTube") {
            // Solo mostrar videos de YouTube
            embed.push(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `);
            dots.push(`<span class="dot">${idx + 1}</span>`); // Crear puntos para navegar entre videos
          }
        });
        var content = `
      <h1 class="no-results">${movie.original_title}</h1>
      <br/>
      ${embed.join("")}
      <br/>
      <div class="dots">${dots.join("")}</div>
      `;
        overlayContent.innerHTML = content; // Establecer el contenido del overlay
        activeSlide = 0; // Establecer el slide activo
        showVideos(); // Mostrar los videos
      } else {
        overlayContent.innerHTML = `<h1 class ="no-results">No Results Found</h1>`; // Mostrar mensaje si no se encuentran videos
      }
    }
  } catch (error) {
    console.error("Failed to fetch video data:", error); // Manejo de errores en la petición de videos
  }
}

/* Función para cerrar el overlay cuando alguien hace clic en el símbolo "x" */
function closeNav() {
  document.getElementById("myNav").style.width = "0%"; // Cerrar el overlay
}

var activeSlide = 0; // Slide activo
var totalVideos = 0; // Total de videos

// Función para mostrar los videos en el overlay
function showVideos() {
  let embedClasses = document.querySelectorAll(".embed"); // Seleccionar todos los elementos con la clase 'embed'
  let dots = document.querySelectorAll(".dot"); // Seleccionar todos los elementos con la clase 'dot'

  totalVideos = embedClasses.length; // Establecer el total de videos
  embedClasses.forEach((embedTag, idx) => {
    if (activeSlide == idx) {
      // Mostrar el video correspondiente al slide activo
      embedTag.classList.add("show");
      embedTag.classList.remove("hide");
    } else {
      // Ocultar los demás videos
      embedTag.classList.add("hide");
      embedTag.classList.remove("show");
    }
  });

  dots.forEach((dot, indx) => {
    if (activeSlide == indx) {
      // Resaltar el punto correspondiente al slide activo
      dot.classList.add("active");
    } else {
      // Quitar el resaltado de los demás puntos
      dot.classList.remove("active");
    }
  });
}

const leftArrow = document.getElementById("left-arrow"); // Botón para ir al slide anterior
const rightArrow = document.getElementById("right-arrow"); // Botón para ir al siguiente slide

leftArrow.addEventListener("click", () => {
  if (activeSlide > 0) {
    // Ir al slide anterior si no estamos en el primer slide
    activeSlide--;
  } else {
    // Ir al último slide si estamos en el primer slide
    activeSlide = totalVideos - 1;
  }

  showVideos(); // Mostrar los videos
});

rightArrow.addEventListener("click", () => {
  if (activeSlide < totalVideos - 1) {
    // Ir al siguiente slide si no estamos en el último slide
    activeSlide++;
  } else {
    // Ir al primer slide si estamos en el último slide
    activeSlide = 0;
  }
  showVideos(); // Mostrar los videos
});

// Función para obtener el color de la calificación según su valor
function getColor(vote) {
  if (vote >= 8) {
    return "green"; // Verde para calificaciones de 8 o más
  } else if (vote >= 5) {
    return "orange"; // Naranja para calificaciones entre 5 y 7.9
  } else {
    return "red"; // Rojo para calificaciones menores a 5
  }
}

// Evento para manejar el envío del formulario de búsqueda
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevenir el envío del formulario por defecto

  const searchTerm = search.value; // Obtener el término de búsqueda
  selectedGenre = []; // Limpiar la lista de géneros seleccionados
  setGenre(); // Volver a establecer los géneros
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm); // Obtener las películas que coinciden con el término de búsqueda
  } else {
    getMovies(API_URL); // Obtener todas las películas si no hay un término de búsqueda
  }
});

// Eventos para manejar la paginación
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage); // Llamar a la función pageCall con la página anterior
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage); // Llamar a la función pageCall con la siguiente página
  }
});

// Función para manejar el cambio de página
function pageCall(page) {
  let urlSplit = lastUrl.split("?"); // Dividir la URL por el signo '?'
  let queryParams = urlSplit[1].split("&"); // Dividir los parámetros de la URL por el signo '&'
  let key = queryParams[queryParams.length - 1].split("="); // Dividir el último parámetro por el signo '='
  if (key[0] != "page") {
    // Si no existe el parámetro 'page', agregarlo
    let url = lastUrl + "&page=" + page;
    getMovies(url); // Obtener las películas de la página especificada
  } else {
    key[1] = page.toString(); // Cambiar el valor del parámetro 'page'
    let a = key.join("="); // Volver a unir el parámetro
    queryParams[queryParams.length - 1] = a; // Reemplazar el último parámetro
    let b = queryParams.join("&"); // Volver a unir todos los parámetros
    let url = urlSplit[0] + "?" + b; // Volver a unir la URL completa
    getMovies(url); // Obtener las películas de la página especificada
  }
}
