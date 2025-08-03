const { error } = require('console')
const mongoose = require('mongoose')

const db = () =>{
    mongoose.connect(process.env.MONGO_DB,)
    .then(()=>{
        console.log("MongoDB connected!")
    })
    .catch((error)=>{
        console.log("An error occured while connecting MongoDB", error)
    })
}

module.exports = db;
