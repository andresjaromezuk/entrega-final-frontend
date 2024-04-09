dotenv.config()
import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv';

const app = express()
const PORT = process.env.PORT || 3000
app.use('/', express.static('./www'))

app.listen(PORT, () => console.log(`Servidor de frontend escuchando en puerto ${PORT}`))


