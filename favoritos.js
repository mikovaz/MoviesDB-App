const urlFire="https://peliculas-app-b6b6c-default-rtdb.firebaseio.com/favoritos.json"

const mostrarFav=()=>{
    fetch(urlFire).then((respuesta)=>respuesta.json())
    .then((body)=>{
        console.log(body)
    })
}

mostrarFav()