const userRepository = require('../repositories/userRepository');

const getUserByLogin = async (login) => {
    return await userRepository.getUserByLogin(login);
}

const insertUser = async (login, password) => {
    return await userRepository.insertUser(login, password);
}

module.exports = {getUserByLogin, insertUser};