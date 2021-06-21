//import 
const {Schema, model} = require('mongoose');

//diet model by day
const DietByDaySchema = Schema({
    dia: {
        type: String,
        require: [true, 'El día es obligatorio']
    }, 
    desayuno: {
        type: String
    },
    almuerzo: {
        type: String
    },
    comida: {
        type: String
    },
    merienda: {
        type: String
    },
    cena: {
        type: String
    },
    ejercicio: {
        type: String
    }
});

DietByDaySchema.methods.toJSON = function() {
    const {__v, _id, ...dietByDay} = this.toObject();
    return {id: _id, ...dietByDay};
}

module.exports = model('DietByDay', DietByDaySchema);