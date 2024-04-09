import express, { json, urlencoded } from 'express'

const app = express()
const PORT = 3000
app.use('/', express.static('./www'))

app.listen(PORT, () => console.log(`Servidor de frontend escuchando en puerto ${PORT}`))


