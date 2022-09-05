import express from 'express'

const router = express.Router()

import playlists from '../models/playlist.models'

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

router.get('/playlists',async (req, res) => {
    try{
        let playlist = await playlists.find()
        res.send(playlist)
        }
    catch(error)
    {
        res.status(500).send(error)
    }
})

router.get('/playlists/:nombre',async (req, res) => {
    try
    {
        let name = req.params.nombre
        let playlist = await playlists.findOne({nombre: name})
        res.send(playlist)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

router.post('/playlists',async (req, res) => {
    try
    {
        let playlist = req.body
        await playlists.create(playlist)
        res.status(201).send(playlist)

    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

router.put('/playlists/:nombre',async (req, res) => {
    try
    {
        let name = req.params.nombre
        let playlist = req.body
        await playlists.findByIdAndUpdate({nombre : name}, playlist)
        let cancion = await playlists.findOne({nombre : name})
        res.send(cancion)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

router.delete('/playlists/:nombre',async (req, res) => {
    try
    {
        let name = req.params.nombre
        await playlists.findOneAndDelete({nombre : name})
        res.status(204).send()

    }
    catch(error)
    {
        res.status(500).send(error)
    }
})
    
    
    // endpoints P2
    router.get('/playlists/:nombre/canciones',async (req, res) => {
    try
    {
        let name = req.params.nombre
        let playlist = playlists.findOne({nombre : name})
        res.send(playlist.canciones)
    }   
    catch(error)
    {
        res.status(500).send(error)
    }
        
})
    
    router.get('/playlists/:nombre/canciones/:titulo',async (req, res) => {
    try
    {
        let name = req.params.nombre
        let tituloc = req.params.titulo
        let playlist = await playlists.findOne({nombre : name})
        let cancion = playlist.canciones.find(x => x.titulo == tituloc)
        res.send(cancion)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

    router.post('/playlists/:nombre/canciones',async (req, res) => {
    try
    {
        let name = req.params.nombre
        let cancion = req.body
        let playlist = await playlists.findOne({nombre : name})
        playlist.canciones.push(cancion)
        await playlists.findByIdAndUpdate({nombre : name}, cancion)
        res.status(201).send()
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

    router.put('/playlists/:nombre/canciones/:titulo',async (req, res) => {
    try
    {
        let name = req.params.nombre
        let tituloc = req.params.titulo
        let cancionn = req.body
        let playlist = await playlists.findOne({nombre : name})
        let cambiar = playlist.canciones.find(x => x.titulo == tituloc)
        cambiar.NomArtista = cancionn.NomArtista
        cambiar.NomAlbum = cancionn.NomAlbum
        cambiar.Lanzamiento = cancionn.Lanzamiento
        await playlists.findByIdAndUpdate({nombre : name}, playlist)
        res.status(201).send() 
    }
    catch(error)
    {
        res.status(500).send(error)
    }
})

    router.delete('/playlists/:nombre/canciones/:titulo',async (req, res) => {
        try
        {
            let name = req.params.nombre
            let tituloc = req.params.titulo
            let playlist = await playlists.findOne({nombre : name})
            let cancion  = playlist.canciones.find(x => x.titulo == tituloc)
            let posicion = playlist.canciones.indexOf(cancion)
            playlist.canciones.splice(posicion, 1)
            await playlists.findByIdAndDelete({nombre : name }, playlist)
            res.status(204).send()
        }
        catch(error)
        {
            res.status(500).send(error)
        }
})

export default router