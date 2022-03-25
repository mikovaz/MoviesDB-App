const urlFire="https://peliculas-app-b6b6c-default-rtdb.firebaseio.com/"
let favGuardado

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

const buscarFav= async(id)=>{
    try{
        const url=`${urlFire}/favoritos.json`
        let peliId,data
        const respoFav= await fetch(url)
        const body=await respoFav.json()
        data=JSON.stringify(body)
        data=JSON.parse(data)
        const favoritos=Object.entries(data).find((fav)=>fav[1].peliculaId==id)
        peliId=favoritos[1].peliculaId
        return peliId
    }
    
    catch(error){console.log(error)}
}

const borrarFav= async(id)=>{
    const url=`${urlFire}/favoritos`
    let favoritoEncontrado
    try{
        let peliId,data
        const respoFav= await fetch(`${url}.json`)
        const bodyFav=await respoFav.json()
        data=JSON.stringify(bodyFav)
        data=JSON.parse(data)
        const favoritos=Object.entries(data).find((fav)=>fav[1].peliculaId==id)
        peliId=favoritos[0]
       // console.log(peliId)
        const borrarFavorito = await fetch(`${url}/${peliId}.json`,
        {
            method: 'DELETE'
        })
        const body=await borrarFavorito.json()
        console.log(body)
    }   
    catch(error){
        console.log(error)
    }
    //console.log(favoritoEncontrado)
    /**
     * fetch(url).then((respuesta)=>respuesta.json())
    .then((body)=>{
        const favoritos=Object.entries(body).find((fav)=>fav[1].peliculaId==id)
        favoritoEncontrado  =favoritos[0]
        //delete favoritoEncontrado
        
    })
     */
}