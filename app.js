const express = require('express')
require('./db/mongoose')
const app = express()
app.use(express.json())

const port = process.env.PORT
console.log(port)
app.get('/',(req,res) => {
    res.send('hi')
})
app.listen(port, () => {
    console.log('server listening on port ' + port)
    })