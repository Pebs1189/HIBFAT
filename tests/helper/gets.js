//i used axios to call entry points from my API
const axios = require('axios').default;

//get all users - params: url(http://localhost:3000/users/)
const getUsers = async (url) => {
    return await (await axios.get(url)).data;
};

//get an user by id- params: url(http://localhost:3000/users/), id(60d1a2dfef5b4527f841603c)
const getUserById = async (url, id) => {
    return await (await axios.get(url + id)).data;
};

module.exports = {
    getUsers,
    getUserById
};