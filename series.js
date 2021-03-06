/**GITHUB TEST */
const containerCards = document.querySelector('.row'); // cuando se pone un punto es porque realiza la busqueda por el nombre de la clase

console.log(containerCards)

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '4e190b3de4323c16e946a007c06ca059';
const urlPoster = 'https://image.tmdb.org/t/p/original';
const apiTV="https://api.themoviedb.org/3/tv/popular?api_key=4e190b3de4323c16e946a007c06ca059&language=es-MX&page=1"

const recuperarPopulares = () => {
    const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=es-MX&region=MX&page=1`

    fetch(apiTV).then((respuesta)=> respuesta.json())
        .then((body)=> {            
            const peliculas = body.results;
            console.log(body)
            peliculas.forEach(pelicula => {
                const card = `
                <div class="card col-sm-3 m-3 shadow-lg bg-light" ondblclick="irPelicula('${pelicula.id}')">
                    <img src="${urlPoster}${pelicula.poster_path}" class="card-img-top mt-3 rounded" alt="${pelicula.original_title}">
                    <div class="card-body">
                        <h3>${pelicula.original_name}</h3>
                        <h6 class="text-muted">Fecha de lanzamiento: ${pelicula.first_air_date}</h6>
                         <p class="card-text">${pelicula.overview}</p>
                         <a href="./pelicula.html?id=${pelicula.id}" ><button type="button" class="btn btn-primary" >Detalles</button></a>
                    </div>
                </div>
                `
                containerCards.insertAdjacentHTML('afterbegin', card)
            });

        });
}

const irPelicula=(idPelicula)=>{
    window.location.assign(`/serie.html?id=${idPelicula}`)
}

// la siguiente tarea es  crear un nuevo archivo html que sea pelicula.html y un nuevo archivo de js que sea pelicula.js, la idea es que nosotros hagamos url/pelicula.html?ID=234234 y que nos regrese la descripcion de la peliculas. En la documentacion de movie DB existe el get/movie/{movie_id}

recuperarPopulares();


