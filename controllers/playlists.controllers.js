import Playlists from "../models/playlist.models"

export const LeerPlaylists = async (req,res) => {
    try{
        let playlist = await playlists.find()
        res.send(playlist)
        }
    catch(error)
    {
        res.status(500).send(error)
    }
}

export const CrearPlaylists = async (req, res) => {
    try
    {
        const Playlist = req.body
        await Playlists.create(Playlist)
        res.send(Playlist)
    }
    catch(error)
    {
        res.status(500).send(error)
    }
}

export const ActualizarPlaylists = async (req,res) => {
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
}