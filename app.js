const express = require('express')
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const cartRouter = require('./routers/cart')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)

const port = process.env.PORT
console.log(port)
app.get('/',(req,res) => {
    res.send('hi')
})
app.listen(port, () => {
    console.log('server listening on port ' + port)
    })