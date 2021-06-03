const express = require('express')

// connect to mongodb
require('./db/mongoose')


const app = express()
const PORT = process.env.PORT || 6000






app.listen(PORT, ()=>{
    console.log('listening u on port: ', PORT);
})

