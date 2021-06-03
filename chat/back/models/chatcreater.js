const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const chatCreaterSchema = new mongoose.Schema({
    name:{
        type: String,
        default:"Mr Robot",
        trim:true,
    },
},{
    timestamps:true
})



chatCreaterSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

chatCreaterSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Sorry, We doesn't recognize that email.")
    }
    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched){
        throw new Error("Unable to login")
    }
    return user
}




const ChatCreater = mongoose.model('User',chatCreaterSchema)


module.exports = ChatCreater;