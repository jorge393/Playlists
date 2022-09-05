import express, { json } from 'express'

import morgan from 'morgan'

import 'dotenv/config'

import PlaylistRouters from './routes/Playlist.routers'

import database from './database'

const app = express()

app.use(json())

app.use(morgan('dev'))

app.use(PlaylistRouters)

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Escuchando pedidos en PORT: ${port}`)
})