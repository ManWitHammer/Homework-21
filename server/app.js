const express = require('express') 
const path = require('path')
const fs = require('fs')

const server = express()

const PORT = 3002

const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
const createJson = (page) => path.resolve(__dirname, 'pages', `${page}.json`) 

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
server.get('/comments1', (req, res) => {
    res.sendFile(createJson('data/data1'))
})
server.use(express.json()); 
server.post('/comments1', (req, res) => {
    const data = JSON.parse(fs.readFileSync('pages/data/data1.json'))
    data.unshift(req.body)
    fs.writeFileSync('pages/data/data1.json', JSON.stringify(data))
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