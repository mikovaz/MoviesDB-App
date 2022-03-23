const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');
const contenedorPelicula = document.getElementById('mainCard')

const generosApi= document.getElementById('generos')
const clasificacionPeliculasDiv = document.getElementById('clasificacionPeliculas')
const ratingDiv = document.getElementById('ratingPeliculas')
const presupuestoDiv = document.getElementById('presupuestoPeliculas')
const recaudacionDiv = document.getElementById('recaudacionPeliculas')


const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '4e190b3de4323c16e946a007c06ca059';
const urlPoster = 'https://image.tmdb.org/t/p/original';
const apiMovieUrl=`${apiUrl}/movie/${id}?api_key=${apiKey}&language=es-MX&region=MX`


console.log(apiMovieUrl)
// fUNCION QUE VA IMPRIMIR LA INFO DE LA API
const mostrarIdPelicula = () => {

    fetch(apiMovieUrl).then((respuesta)=> respuesta.json())
        .then((body)=> {            
            const card = `
            <div class="d-flex justify-content-center"><div class=" col-sm-5 col-md-5 col-xxl-5 col-xl-5 col-lg-5 shadow"><img src="${urlPoster}${body.poster_path}" class="card-img-top" style=""></div></div>
            <h5 class="card-title text-muted text-center mt-1">${body.title}</h5>
            <p class="card-text font-monospace text-center mb-0">Fecha de lanzamiento: ${body.release_date}</p>
            <p class="card-text text-center fw-lighter mb-0">Duración: ${body.runtime} minutos</p>
            <a href="${}"<button type="button" class="btn btn-dark"></button>
            <div class="d-flex justify-content-center"><p class="card-text m-3 col-sm-8 col-md-10 col-xxl-10 col-xl-10 col-lg-10"><span class="fw-bold">Detalles:</span> ${body.overview}<p></div>
            `
            mostrarGeneros(body)
            clasificacionPelicula(body);
            ratingPeliculas(body);
            presupuestoPeliculas(body);
            recaudacionPeliculas(body);
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
        let presupuestoFormeateado = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(presupuesto);
        
        const presupuestoBoton = `
        <span class="badge bg-success">
        Presupuesto: <span class="badge bg-secondary">${presupuestoFormeateado} USD</span>
        </span>
        `
        presupuestoDiv.insertAdjacentHTML('afterbegin', presupuestoBoton)

    }

    const recaudacionPeliculas = (body) => {
        let recaudacion = body.revenue;
        let recaudacionFormateado = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(recaudacion);

        const recaudacionBoton = `
        <span class="badge bg-success">
        Recaudación: <span class="badge bg-secondary">${recaudacionFormateado} USD</span>
        </span>
        `
        recaudacionDiv.insertAdjacentHTML('afterbegin', recaudacionBoton)
    }

    mostrarIdPelicula();
