const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=4e190b3de4323c16e946a007c06ca059&language=es-MX&query=';
const apiKey = '4e190b3de4323c16e946a007c06ca059';
const urlPoster = 'https://image.tmdb.org/t/p/original';
const apiSearchMovie="https://api.themoviedb.org/3/search/movie?api_key=4e190b3de4323c16e946a007c06ca059&language=es-MX&query=batman&page=1&include_adult=false"
const apiUrlT=`&page=1&include_adult=false`


const containerCards = document.getElementById('resultadosSearch'); // cuando se pone un punto es porque realiza la busqueda por el nombre de la clase



const main=(palabra)=>{
    const tamCards = containerCards.children
    if(tamCards.length>0) {
        const cards= Array.from(tamCards)
        cards.forEach((card)=>{
            containerCards.removeChild(card)
        })
    }
    const urlSearch = `${apiUrl}${palabra.cajaBusqueda}${apiUrlT}`
    console.log(urlSearch)
    fetch(urlSearch).then((respuesta)=> respuesta.json())
    .then((body)=>{
        //console.log(body)
        body.results.forEach((pelicula)=>{
            //console.log(pelicula)

            const card = `
            <div class="card col-sm-3 m-3 shadow-lg bg-light" ondblclick="irPelicula('${pelicula.id}')">
                <img src="${urlPoster}${pelicula.backdrop_path}" class="card-img-top mt-3 rounded" alt="${pelicula.original_title}">
                <div class="card-body">
                    <h3>${pelicula.original_title}</h3>
                    <h6 class="text-muted">Fecha de lanzamiento: ${pelicula.release_date}</h6>
                     <p class="card-text">${pelicula.overview}</p>
                     <a href="./pelicula.html?id=${pelicula.id}" ><button type="button" class="btn btn-primary" >Detalles</button></a>
                </div>
            </div>
            `
            containerCards.insertAdjacentHTML('afterbegin', card)
        })
    })
}

const valor=(e)=>{
    e.preventDefault();
    const inputsNode = e.target.querySelectorAll('input');
    const inputs = Array.from(inputsNode);
    const inputBusqueda={}
    inputs.forEach((busqueda)=>{
        inputBusqueda[busqueda.name] = busqueda.value;
    })
    main(inputBusqueda)
    console.log(inputBusqueda)
}




