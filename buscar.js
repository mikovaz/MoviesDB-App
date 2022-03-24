const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=4e190b3de4323c16e946a007c06ca059&language=es-MX&query=';
const apiKey = '4e190b3de4323c16e946a007c06ca059';
const urlPoster = 'https://image.tmdb.org/t/p/original';
const apiSearchMovie="https://api.themoviedb.org/3/search/movie?api_key=4e190b3de4323c16e946a007c06ca059&language=es-MX&query=batman&page=1&include_adult=false"
const apiUrlT=`&page=1&include_adult=false`

const main=()=>{
    fetch(apiSearchMovie).then((respuesta)=> respuesta.json())
    .then((body)=>{
        //console.log(body)
        body.results.forEach((pelicula)=>{
            console.log(pelicula)
        })
    })
}

main()





