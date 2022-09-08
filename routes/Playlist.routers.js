import {Router} from 'express'

const router = Router()

import {LeerPLaylists, LeerPorNombre, CrearPlaylists, 
        ActualizarPlaylists, BorrarPlaylists, LeerCanciones,
        LeerPorTitulo, CrearCancion, ActualizarCancion, 
        BorrarCancion} from '../controllers/playlists.controllers.js'

// var playlists = [{  "nombre" : "lista_god", 
//                     "descripcion": "es god",
//                     "canciones":[ {"titulo" : "something", 
//                                 "nombreArtista":"The Beatles", 
//                                 "nombreAlbum": "Abbey Road", 
//                                 "añoEdicion": 1969 },
//                                 {   "titulo": "Cancion para mi muerte",
//                                     "nombreArtista": "Sui Generis",
//                                     "nombreAlbum": "Vida",
//                                     "añoEdicion": 1972}] 
//                 },
//                 {  
//                     "nombre" : "ads", 
//                     "descripcion": "as",
//                     "canciones":[{"titulo" : "a", 
//                                 "nombreArtista":"a", 
//                                 "nombreAlbum": "a", 
//                                 "añoEdicion": 2021 }] 
//                 }]

// endpoints P1

router.get('/playlists', LeerPLaylists)

router.get('/playlists/:nombre', LeerPorNombre)

router.post('/playlists', CrearPlaylists)

router.put('/playlists/:nombre', ActualizarPlaylists)

router.delete('/playlists/:nombre',BorrarPlaylists)
    
    
    // endpoints P2
router.get('/playlists/:nombre/canciones', LeerCanciones)

router.get('/playlists/:nombre/canciones/:titulo', LeerPorTitulo)

router.post('/playlists/:nombre/canciones', CrearCancion)

router.put('/playlists/:nombre/canciones/:titulo', ActualizarCancion)

router.delete('/playlists/:nombre/canciones/:titulo', BorrarCancion)

export default router