const express = require('express')
const res = require('express/lib/response')

const app = express()

app.use(express.json())

const port = 3000

var playlists = [{  nombre : "lista_god", 
                    descripcion: "es god",
                    canciones:[ {titulo : "something", 
                                nombreArtista:"The Beatles", 
                                nombreAlbum: "Abbey Road", 
                                añoEdicion: 1969 },
                                {   titulo: "Cancion para mi muerte",
                                    nombreArtista: "Sui Generis",
                                    nombreAlbum: "Vida",
                                    añoEdicion: 1972}] 
                },
                {  
                    nombre : "ads", 
                    descripcion: "as",
                    canciones:[{titulo : "a", 
                                nombreArtista:"a", 
                                nombreAlbum: "a", 
                                añoEdicion: 2021 }] 
                }]
    
app.get('/playlists', (pedido, respuesta) => {
    respuesta.send(playlists)
})

app.get('/playlists/:nombre', (pedido, respuesta) => {
    let name = pedido.params.nombre
    let ver = (playlists.filter(x => x.nombre == name)).at(0)
    if(ver == "")
    respuesta.status(404).send("not found")
    else
    respuesta.send(ver.descripcion)
})

app.post('/playlists', (pedido, respuesta) => {
    ver = pedido.body.nombre
    if(ver == "")
    respuesta.status(400).send("bad request")
    else
    playlists.push(pedido.body)
    respuesta.status(201).send(pedido.body)
})

app.put('/playlists/:nombre', (pedido, respuesta) => {
    let name = pedido.params.nombre
    let existe = (playlists.some(x => x.nombre == name))
    let playlist = (playlists.filter(x => x.nombre == name)).at(0) 
    if(existe == "")
    {
        respuesta.status(404).send("not found")
    }
    else if (pedido.body.nombre != playlist.nombre)
    {
        respuesta.status(409).send("no papu, eso no se puede hacer")
    }
    else 
    {
        playlist.descripcion = pedido.body.descripcion
        respuesta.send(playlist)
    }
})
app.delete('/playlists/:nombre', (pedido, respuesta) => {
        let name = pedido.params.nombre
        let existe = (playlists.some(x => x.nombre == name))
        if(existe == true)
        {
            let listaborrar = (playlists.filter(x => x.nombre = name))
            let indice = playlists.indexOf(listaborrar)
            playlists.splice(indice, 1)
            respuesta.status(204).send()
        }
        else
        {
            respuesta.status(404).send()
        }
        
    })
    
    
    // parte dos de API
    app.get('/playlists/:nombre/canciones', (pedido, respuesta) => {
        let name = pedido.params.nombre
        let song = playlists.filter(x => x.nombre = name).at(0)
        respuesta.send(song.canciones)
        console.log(song.canciones)
        
    })
    
    app.get('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
        let name = pedido.params.nombre
        let titulo = pedido.params.titulo
        let songa = playlists.filter(x => x.nombre == name).at(0)
        if(songa != null)
        {
        let cancion = songa.canciones.filter(x => x.titulo == titulo).at(0)
            if(cancion != null)
            {
                respuesta.send(cancion)
            }
            else
            {
                respuesta.status(404).send()
            }
            
        }
        else
        {
            respuesta.status(404),send()
        }
        
    })

    app.post('/playlists/:nombre/canciones', (pedido, respuesta) => {
        let name = pedido.params.nombre
        let existe = playlists.some(x => x.nombre == name)
        if (existe != null) 
        {
            let song = playlists.filter(x => x.nombre == name).at(0)
            console.log(pedido.body.titulo)
            if (pedido.body.titulo != "") 
            {
                song.canciones.push(pedido.body)
                playlists.push(song)
                respuesta.status(201).send()
            }
            else 
            {
                respuesta.status(400).send()
            }
        }
        else 
        {
            respuesta.status(404).send()
        }
    })

    app.put('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
        let name = pedido.params.nombre
        let titulo = pedido.params.titulo
        let song = playlists.filter(x => x.nombre == name).at(0)
        if(song != null)
        {
        let cancion = song.canciones.filter(x => x.titulo == titulo).at(0)
            if(cancion != null)
            {
                cancion.nombreArtista = pedido.body.nombreArtista
                cancion.nombreAlbum = pedido.body.nombreAlbum
                cancion.añoEdicion = pedido.body.añoEdicion
                respuesta.send(cancion)
            }
            else
            {
                respuesta.status(404).send()
            }
            
        }
        else
        {
            respuesta.status(404),send()
        }
        })

        app.delete('/playlists/:nombre/canciones/:titulo', (pedido, respuesta) => {
            let name = pedido.params.nombre
            let titulo = pedido.params.titulo
            let song = playlists.filter(x => x.nombre == name).at(0)
            if(song != null)
            {
            let cancion = song.canciones.filter(x => x.titulo == titulo).at(0)
                if(cancion != null)
                {
                    let indice = playlists.indexOf(song)
                    var indices = 0
                    playlists[indice].canciones.forEach((Element,i) =>
                    {
                        if(Element.titulo == titulo)
                        indices = i
                    })
                    playlists[indice].canciones.splice(indices,1)
                    respuesta.send()
                }
                else
                {
                    respuesta.status(404).send()
                }
                
            }
            else
            {
                respuesta.status(404),send()
            }
            })

    app.listen(port)