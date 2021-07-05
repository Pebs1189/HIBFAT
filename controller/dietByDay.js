const { response } = require("express");


const addDietByDay = (req, resp = response)=> {
    const body = req.body;

    console.log(req)

    return resp.json(body);
}

module.exports = {
    addDietByDay
}