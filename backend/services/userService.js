const userRepository = require('../repositories/userRepository');

const getUserByLogin = async (login) => {
    return await userRepository.getUserByLogin(login);
}

module.exports = {getUserByLogin};