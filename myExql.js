var express = require('express')
var app = express()
var myroute = require('./route/auth')

app.use(myroute)

app.get('/', (req, res)=>{
    res.send({"status": "Server Aktif!"})
})

app.use((req, res)=>{
    res.status(404).send({"status":"404 Not Found!"})
})

app.listen(3331, ()=>{
    console.log('Server Sudah Aktif di Port 3331!')
})