const mongoose = require('mongoose')

async function ConnectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL)
    }catch(err){
    (err) => console.log(err)
    }
}

module.exports = ConnectToDb;