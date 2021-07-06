const { response } = require("express");


const addDietByDay = (req, resp = response)=> {
    if (req.isAuthenticated()){
        const body = req.body;

        return resp.json(body);
    } else {
        return resp.json({msg:'No está atutenticado'});
    }
}

module.exports = {
    addDietByDay
}