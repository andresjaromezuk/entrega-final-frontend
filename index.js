const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

//import {fileURLToPath} from 'url'
// import {dirname} from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// export default __dirname

const app = express()
const PORT = process.env.PORT || 3000
//app.use('/', express.static('./www'))
app.use('/', express.static(path.join(__dirname, './www')))


app.listen(PORT, () => console.log(`Servidor de frontend escuchando en puerto ${PORT}`))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'home.html'))
})
app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'login.html'))
})

app.get('/register', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'register.html'))
})

app.get('/profile', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'profile.html'))
})

app.get('/products', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'products.html'))
})

app.get('/product', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'product.html'))
})

app.get('/cart', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'cart.html'))
})

app.get('/confirmation', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'confirmation.html'))
})

app.get('/addEmail', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'addEmail.html'))
})

app.get('/checkEmail', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'checkEmail.html'))
})

app.get('/resetPassword', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'resetPassword.html'))
})

app.get('/admin/users', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'admin', 'users.html'))
})

app.get('/admin/tickets', (req, res)=>{
    res.sendFile(path.join(__dirname, 'www', 'admin', 'tickets.html'))
})


