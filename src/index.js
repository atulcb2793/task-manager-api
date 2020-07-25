const express = require('express')
require('./db/moongose')
const app = express()
app.use(express.json())
const port = process.env.PORT
const userRoute = require('../src/routers/user')
const taskRoute = require('../src/routers/task')

app.use(userRoute)
app.use(taskRoute)

app.listen(port, ()=>{
    console.log('App started --',port)
})