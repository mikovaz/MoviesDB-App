const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const contenedorPelicula = document.getElementById('mainCard')
const generosApi= document.getElementById('generos')
const idCarusel=document.getElementById('carouselExampleCaptions')
const urlApiCreditos=`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e190b3de4323c16e946a007c06ca059&language=en-US`
const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '4e190b3de4323c16e946a007c06ca059';
const urlPoster = 'https://image.tmdb.org/t/p/original';
const apiTV="https://api.themoviedb.org/3/tv/${id}?api_key=4e190b3de4323c16e946a007c06ca059&language=es-MX"
const apiMovieUrl=`${apiUrl}/movie/${id}?api_key=${apiKey}&language=es-MX&region=MX`
const clasificacionPeliculasDiv = document.getElementById('clasificacionPeliculas')
const ratingDiv = document.getElementById('ratingPeliculas')
const presupuestoDiv = document.getElementById('presupuestoPeliculas')
const recaudacionDiv = document.getElementById('recaudacionPeliculas')
const caroItem= document.getElementById('caroItem')

console.log(apiMovieUrl)
// fUNCION QUE VA IMPRIMIR LA INFO DE LA API
const mostrarIdPelicula = () => {

    fetch(apiMovieUrl).then((respuesta)=> respuesta.json())
        .then((body)=> {            
            //console.log(body)
            const card = `
            <div class="d-flex justify-content-center"><div class="col-sm-5 col-md-5 col-xxl-5 col-xl-5 col-lg-5"><img src="${urlPoster}${body.poster_path}" class="card-img-top" style=""></div></div>
            <h5 class="card-title text-muted text-center">${body.title}</h5>
            <p class="card-text font-monospace text-center">${body.release_date}</p>
            <div class="d-flex justify-content-center "><p class="card-text m-3 col-sm-10 col-md-10 col-xxl-10 col-xl-10 col-lg-10"><span class="fw-bold">Detalles:</span> ${body.overview}<p></div>
            `;
            mostrarGeneros(body)
            clasificacionPelicula(body);
            ratingPeliculas(body);
            presupuestoPeliculas(body);
            recaudacionPeliculas(body);
            mostrarActores();
            contenedorPelicula.insertAdjacentHTML('afterbegin', card)
        });
    }
    const mostrarGeneros=(body)=>{
        
        let generos=body.genres.map((genero)=>{
            return `${genero.name}`
        })
       
        generos.forEach((apiBody)=>{
            const genero=`<spam></spam>
            <li class="list-group-item">${apiBody}</li>`
            generosApi.insertAdjacentHTML('afterbegin',genero)
        })
    }

    const mostrarActores=()=>{
        fetch(urlApiCreditos).then((respuesta)=>respuesta.json())
        .then((body)=>{
            console.log(body.cast)
           const primerActor=`
           <div class="carousel-item active">
                    <div class="d-flex justify-content-center"><img src="${urlPoster}${body.cast[0].profile_path}" class="d-block rounded" style="width: 350px; height:350px" alt="..."></div>
                    <div class="carousel-caption d-none d-md-block">
                      <h5 class="">${body.cast[0].original_name}</h5>
                      <p>${body.cast[0].character}</p>
                    </div>
            </div>
           `
           //console.log(`${urlPoster}${body.cast[0].profile_path}`)
           caroItem.insertAdjacentHTML('afterbegin',primerActor)
            for(let i=1;i<5;i++){
                const itmCaro=`
                <div class="carousel-item ">
                    <div class="d-flex justify-content-center"><img src="${urlPoster}${body.cast[i].profile_path}" class="d-block rounded" style="width: 350px; height:350px" alt="..."></div>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${body.cast[i].original_name}</h5>
                        <p>${body.cast[i].character}</p>
                    </div>
                </div>`
                caroItem.insertAdjacentHTML('beforeend',itmCaro)
                //${urlPoster}${body.cast[i].profile_path}
            }//id="caroItem"
        })
        
    }

    const clasificacionPelicula= (body) => {

        let clasificacion = body.adult;

        if (clasificacion) {
            const alertaClasificacion = `
            <div class="alert alert-danger me-1">
            <p>Esta película está para adultos</p>
            </div>
            `
            clasificacionPeliculasDiv.insertAdjacentHTML('afterbegin', alertaClasificacion)
        } else {
            const alertaClasificacion = `
            <div class="alert alert-primary me-1">

            <span class="text-center m-0 p-0">Esta película no está clasificada para adultos</span>   
            </div>      
            `
            clasificacionPeliculasDiv.insertAdjacentHTML('afterbegin', alertaClasificacion)
            
        }
        

    }

    const ratingPeliculas = (body) => {
        let rating = body.vote_average
        const barraRating = `
        <span class="badge bg-primary">
        Rating: <span class="badge bg-secondary">${rating}/10</span>
      </span>
        `
        ratingDiv.insertAdjacentHTML('afterbegin', barraRating)
    }

    const presupuestoPeliculas = (body) => {
        let presupuesto = body.budget;

        if (presupuesto > 0) {
            let presupuestoFormeateado = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(presupuesto);
            
            const presupuestoBoton = `
            <span class="badge bg-success">
            Presupuesto: <span class="badge bg-secondary">${presupuestoFormeateado} USD</span>
            </span>
            `
            presupuestoDiv.insertAdjacentHTML('afterbegin', presupuestoBoton)
        }
    }

    const recaudacionPeliculas = (body) => {
        let recaudacion = body.revenue;

        if (recaudacion > 0) {
            let recaudacionFormateado = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(recaudacion);

            const recaudacionBoton = `
            <span class="badge bg-success">
            Recaudación: <span class="badge bg-secondary">${recaudacionFormateado} USD</span>
            </span>
            `
            recaudacionDiv.insertAdjacentHTML('afterbegin', recaudacionBoton)
        }


    }

    mostrarIdPelicula();
