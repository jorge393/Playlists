import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema
({  nombre:{ type: String, required: true},
    descripcion:{ type: String, required: true },
    canciones:[{titulo:{type: String, required: true},
                NomArtista:{type: String, required: true},
                NomAlbum:{type: String, required: true},
                Lanzamiento:{type: String, required: true}}]

},
{
    timestamps: true,
    versionKey: false
})

const Playlist = mongoose.model('Playlist', playlistSchema)

export default Playlist