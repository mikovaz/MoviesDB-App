const urlFire="https://peliculas-app-b6b6c-default-rtdb.firebaseio.com/"

const crearPeliFav=(peliculaId,backdrop_path,original_title,release_date,overview,funcion)=>{
    const url=`${urlFire}/favoritos.json`
    const peli={peliculaId,backdrop_path,original_title,release_date,overview}    

    fetch(url,{
        method:'POST',
        body: JSON.stringify(peli),
        headers: {
            'Content-type':'application/json'
        }
    }).then((respuesta)=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error))

}

const recuFav=(funcion)=>{
    const url=`${urlFire}/favoritos.json`
    fetch(url)
    .then(respuesta=>respuesta.json())
    .then((body)=>funcion(body))
    .catch((error)=>console.log(error))
}