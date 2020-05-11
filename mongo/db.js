const mongoose = require('mongoose');

//Here a function for the connection to the server. 
const connectDB = async () => {
    try {
        // For connecting to the MongoDB server we use the method connect of mongoose
        // this method needs the URI/URL for connecting to the server and some options for
        // being compatible with new versions of MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log( ` MongoDB connect to ${conn.connection.host}` )
    } catch (error) {
        return console.log('Could not connect',error)
    }
}


module.exports = connectDB;