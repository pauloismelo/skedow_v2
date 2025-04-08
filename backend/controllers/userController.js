const userService = require('../services/userService');

const getUserByLogin = async (login) => {
    try{
        const user = await userService.getUserByLogin(login);
        return user;
    }catch(err){
        throw err;
    }
}

const insertUser = async (login, password) =>{
    try{
       const user = await userService.insertUser(login, password);
       return user;
    }catch(err){
        throw err;
    }
}

module.exports = {getUserByLogin, insertUser};