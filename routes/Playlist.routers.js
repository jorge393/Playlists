import express from 'express'

const router = express.Router()

import Cancion from '../models/playlist.models'

// var playlists = [{  nombre : "lista_god", 
//                     descripcion: "es god",
//                     canciones:[ {titulo : "something", 
//                                 nombreArtista:"The Beatles", 
//                                 nombreAlbum: "Abbey Road", 
//                                 añoEdicion: 1969 },
//                                 {   titulo: "Cancion para mi muerte",
//                                     nombreArtista: "Sui Generis",
//                                     nombreAlbum: "Vida",
//                                     añoEdicion: 1972}] 
//                 },
//                 {  
//                     nombre : "ads", 
//                     descripcion: "as",
//                     canciones:[{titulo : "a", 
//                                 nombreArtista:"a", 
//                                 nombreAlbum: "a", 
//                                 añoEdicion: 2021 }] 
//                 }]

// endpoints P1
router.get('/playlists', (req, res) => {
    res.send(playlists)
})

router.get('/playlists/:nombre', (req, res) => {
    let name = req.params.nombre
    let ver = (playlists.find(x => x.nombre == name)).at(0)
    if(ver == "")
    {
        res.status(404).send("")
        return
    }
    else
    {
        res.send(ver.descripcion)
    }
})

router.post('/playlists', (req, res) => {
    ver = req.body.nombre
    if(ver == "")
    res.status(400).send("bad req")
    else
    playlists.push(req.body)
    res.status(201).send(req.body)
})

router.put('/playlists/:nombre', (req, res) => {
    let name = req.params.nombre
    let existe = (playlists.some(x => x.nombre == name))
    let playlist = (playlists.find(x => x.nombre == name)).at(0) 
    if(existe == "")
    {
        res.status(404).send("not found")
        return
    }
    else if (req.body.nombre != playlist.nombre)
    {
        res.status(409).send()
        return
    }
    else 
    {
        playlist.descripcion = req.body.descripcion
        res.send(playlist)
    }
})
router.delete('/playlists/:nombre', (req, res) => {
        let name = req.params.nombre
        let existe = (playlists.some(x => x.nombre == name))
        if(existe == true)
        {
            let listaborrar = (playlists.find(x => x.nombre = name))
            let indice = playlists.indexOf(listaborrar)
            playlists.splice(indice, 1)
            res.status(204).send()
            return
        }
        else
        {
            res.status(404).send()
            return
        }
        
    })
    
    
    // endpoints P2
    router.get('/playlists/:nombre/canciones', (req, res) => {
        let name = req.params.nombre
        let song = playlists.find(x => x.nombre = name).at(0)
        res.send(song.canciones)
        console.log(song.canciones)
        
    })
    
    router.get('/playlists/:nombre/canciones/:titulo', (req, res) => {
        let name = req.params.nombre
        let titulo = req.params.titulo
        let songa = playlists.find(x => x.nombre == name).at(0)
        if(songa != null)
        {
        let cancion = songa.canciones.find(x => x.titulo == titulo).at(0)
            if(cancion != null)
            {
                res.send(cancion)
            }
            else
            {
                res.status(404).send()
                return
            }
            
        }
        else
        {
            res.status(404),send()
            return
        }
        
    })

    router.post('/playlists/:nombre/canciones', (req, res) => {
        let name = req.params.nombre
        let existe = playlists.some(x => x.nombre == name)
        if (existe != null) 
        {
            let song = playlists.find(x => x.nombre == name).at(0)
            console.log(req.body.titulo)
            if (req.body.titulo != "") 
            {
                song.canciones.push(req.body)
                playlists.push(song)
                res.status(201).send()
            }
            else 
            {
                res.status(400).send()
                return
            }
        }
        else 
        {
            res.status(404).send()
            return
        }
    })

    router.put('/playlists/:nombre/canciones/:titulo', (req, res) => {
        let name = req.params.nombre
        let titulo = req.params.titulo
        let song = playlists.find(x => x.nombre == name).at(0)
        if(song != null)
        {
        let cancion = song.canciones.find(x => x.titulo == titulo).at(0)
            if(cancion != null)
            {
                cancion.nombreArtista = req.body.nombreArtista
                cancion.nombreAlbum = req.body.nombreAlbum
                cancion.añoEdicion = req.body.añoEdicion
                res.send(cancion)
            }
            else
            {
                res.status(404).send()
                return
            }
            
        }
        else
        {
            res.status(404),send()
            return
        }
        })

        router.delete('/playlists/:nombre/canciones/:titulo', (req, res) => {
            let name = req.params.nombre
            let titulo = req.params.titulo
            let song = playlists.find(x => x.nombre == name).at(0)
            if(song != null)
            {
            let cancion = song.canciones.find(x => x.titulo == titulo).at(0)
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
                    res.send()
                }
                else
                {
                    res.status(404).send()
                    return
                }
                
            }
            else
            {
                res.status(404),send()
                return
            }
            })

export default router