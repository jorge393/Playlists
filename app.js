import express, { json } from 'express'

import morgan from 'morgan'

import 'dotenv/config'

import PlaylistRouters from './routes/Playlist.routers'

const app = express()

app.use(json())

app.use(morgan('dev'))

app.use(PlaylistRouters)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Escuchando pedidos en PORT: ${port}`)
})