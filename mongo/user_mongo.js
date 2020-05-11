const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')


// Find the user data by id or username.
findUser = async (user = null) => {
    
    let result;

    if(mongoose.Types.ObjectId.isValid(user)){
        result = await User.findById(user);
    }else{
        result = await User.findOne({username:user});
    }
    
    if(result){
        return result
    }else{
        return null
    }
}

// This function will insert data into the database. (create a new user)
// body is an object 
createUser = async (body) => {

    var pwd = body.password;
    
    body.password = bcrypt.hashSync(pwd,10);

    
    var data = {};
    
    for(prop in body){
        data[prop] = body[prop];
    }

    let newUser = new User(data)

    let output = await newUser.save()


    return output._id
}

loginUser = async (username, password) => {
    
    let user = await findUser(username)
        
        if(user) {
            
            let userPassword = user.password;
            if(bcrypt.compareSync(password, userPassword)) {
               
                return(user);
                
            }  
        }

        return(null);
    
}

const userFunctions = {
    findUser,
    createUser,
    loginUser
}

module.exports = userFunctions;
