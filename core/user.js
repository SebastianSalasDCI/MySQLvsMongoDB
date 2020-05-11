const pool = require('./pool');
const bcrypt = require('bcrypt');

// Find the user data by id or username.
findUser = async (user = null) => {
    // if the user variable is defind
    if(user) {
        // if user = number return field = id, if user = string return field = username.
        var field = Number.isInteger(user) ? 'id' : 'username';
    }
    // prepare the sql query
    let sql = `SELECT * FROM users WHERE ${field} = ?`;


    let result = await pool.query(sql, user);

    if(result.length){
        return result[0]
    }else{
        return null
    }
}

// This function will insert data into the database. (create a new user)
// body is an object 
createUser = async (body) => {

    var pwd = body.password;
    // Hash the password before insert it into the database.
    body.password = bcrypt.hashSync(pwd,10);

    // this array will contain the values of the fields.
    var bind = [];
    // loop in the attributes of the object and push the values into the bind array.
    // 'prop in body' is similar to the foreach for arrays
    for(prop in body){
        bind.push(body[prop]);
    }

    // prepare the sql query
    let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;
    // call the query give it the sql string and the values (bind array)
    
    let output = await pool.query(sql, bind);


    return output.insertId
}

loginUser = async (username, password) => {
    // find the user data by his username.
    let user = await findUser(username)
        // if there is a user by this username.
        if(user) {
            // now we check his password.
            if(bcrypt.compareSync(password, user.password)) {
                // return his data.
                return(user);
                
            }  
        }
        // if the username/password is wrong then return null.
        return(null);
    
}

const userFunctions = {
    findUser,
    createUser,
    loginUser
}

module.exports = userFunctions;
