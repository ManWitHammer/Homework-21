const express = require('express') // подключение express
const path = require('path') // подключение path

const server = express() // вызов express 

const PORT = 3000

// функция, определения пути до файла
const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)

server.use(express.static(__dirname + '/pages')) // подключение статических файлов

//базовая прослушка сервера
server.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})

//базовая имплементация роутинга на express
server.get('/', (req, res) => {
    res.sendFile(createPath('index'))
})
server.get('/main', (req, res) => {
    res.redirect('/')
})
server.get('/home', (req, res) => {
    res.redirect('/')
})
server.get('/page1', (req, res) => {
    res.sendFile(createPath('page1'))
})
server.get('/page2', (req, res) => {
    res.sendFile(createPath('page2'))
})
server.get('/page3', (req, res) => {
    res.sendFile(createPath('page3'))
})
server.get('/page4', (req, res) => {
    res.sendFile(createPath('page4'))
})
server.get('/page5', (req, res) => {
    res.sendFile(createPath('page5'))
})

server.use((req, res) => {
    res.status(404).sendFile(createPath('error'))
})