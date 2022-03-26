const containerCards = document.querySelector('.row'); // cuando se pone un punto es porque realiza la busqueda por el nombre de la clase
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '4e190b3de4323c16e946a007c06ca059';
const urlPoster = 'https://image.tmdb.org/t/p/original';
const urlFireFavo="https://peliculas-app-b6b6c-default-rtdb.firebaseio.com/favoritos.json"

let peliculas={}

const recuperarPopulares = () => {
    const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=es-MX&region=MX&page=1`

    fetch(url).then((respuesta)=> respuesta.json())
        .then((body)=> {            
            peliculas = body.results;

            peliculas.forEach(pelicula => {
                const card = `
                <div class="card col-sm-3 m-3 shadow-lg bg-light" ondblclick="irPelicula('${pelicula.id}')">
                    <img src="${urlPoster}${pelicula.backdrop_path}" class="card-img-top mt-3 rounded" alt="${pelicula.original_title}">
                    <div class="card-body">
                        <h3>${pelicula.original_title}</h3>
                        <h6 class="text-muted">Fecha de lanzamiento: ${pelicula.release_date}</h6>
                         <p class="card-text">${pelicula.overview}</p>
                         <a href="./pelicula.html?id=${pelicula.id}" ><button type="button" class="btn btn-primary" >Detalles</button></a>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button id="${pelicula.id}" onclick="marcarFav('${pelicula.id}')" class="btn btn-outline-danger"><i class="bi bi-heart"></i></button>
                    </div>
                </div>
                `
                containerCards.insertAdjacentHTML('afterbegin', card)
            });
            recuFav((body)=>{
                const fav=Object.values(body)
                fav.forEach((favorito)=>{
                    //console.log(favorito.peliculaId)
                    const button=document.getElementById(favorito.peliculaId)
                    button.classList.remove('btn-outline-danger')
                    button.classList.add('btn-danger')
                })
            })
        });
}

const marcarFav = async(id)=>{
    const peli= peliculas.find((pelicula)=>pelicula.id==id)
    let favoGuardado=await buscarFav(id)
    console.log(favoGuardado)
    if(favoGuardado==id){
        console.log('Ya existe')
        borrarFav(id)
        const button=document.getElementById(peli.id)
                button.classList.remove('btn-danger')
                button.classList.add('btn-outline-danger')
    }
    else{
        crearPeliFav(
            peli.id,
            peli.backdrop_path,
            peli.original_title,
            peli.release_date,
            peli.overview,
            (body)=>{
            //    console.log(peli.id)
                const button=document.getElementById(peli.id)
                button.classList.remove('btn-outline-danger')
                button.classList.add('btn-danger')
            }
        )
    }
}

const irPelicula=(idPelicula)=>{
    window.location.assign(`/pelicula.html?id=${idPelicula}`)
}

// la siguiente tarea es  crear un nuevo archivo html que sea pelicula.html y un nuevo archivo de js que sea pelicula.js, la idea es que nosotros hagamos url/pelicula.html?ID=234234 y que nos regrese la descripcion de la peliculas. En la documentacion de movie DB existe el get/movie/{movie_id}

recuperarPopulares();

