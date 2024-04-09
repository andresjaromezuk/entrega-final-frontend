import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv';
dotenv.config()

const app = express()
const PORT = process.env.PORT 
app.use('/', express.static('./www'))

app.listen(PORT, () => console.log(`Servidor de frontend escuchando en puerto ${PORT}`))


