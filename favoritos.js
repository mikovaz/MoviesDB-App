const urlFire="https://peliculas-app-b6b6c-default-rtdb.firebaseio.com/favoritos.json"
const urlPoster = 'https://image.tmdb.org/t/p/original';
const cardsFav= document.getElementById('cardsFav')

const mostrarFav=()=>{
    fetch(urlFire).then((respuesta)=>respuesta.json())
    .then((body)=>{
        
        let fav= Object.entries(body).map((favo)=>{
            const card = `
                <div class="card col-sm-3 m-3 shadow-lg bg-light" ondblclick="irPelicula('${favo[1].peliculaId}')">
                    <img src="${urlPoster}${favo[1].backdrop_path}" class="card-img-top mt-3 rounded" alt="${favo[1].original_title}">
                    <div class="card-body">
                        <h3>${favo[1].original_name}</h3>
                        <h6 class="text-muted">Fecha de lanzamiento: ${favo[1].release_date}</h6>
                         <p class="card-text">${favo[1].overview}</p>
                         <a href="./pelicula.html?id=${favo[1].peliculaId}" ><button type="button" class="btn btn-primary" >Detalles</button></a>
                    </div>
                </div>
                `
        cardsFav.insertAdjacentHTML('afterbegin',card)
        })
        
        
        
    })
}

mostrarFav()