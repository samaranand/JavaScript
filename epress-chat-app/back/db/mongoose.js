const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL


mongoose.connect(connectionURL, {
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    useCreateIndex:true
}, ()=>{
    console.log('connection success')
})


