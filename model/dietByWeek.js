//imports
const {Schema, model} = require('mongoose');

//user model
const DietByWeekSchema = Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    descripcion: {
        type: String
    },
    kg:{
        type: Number
    },
    meses: {
        type: Number
    },
    lunes: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    },
    martes: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    },
    miercoles: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    },
    jueves: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    },
    viernes: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    },
    sabado: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    },
    domingo: {
        type: Schema.Types.ObjectId,
        ref: 'DietByDay'
    }
});

DietByWeekSchema.methods.toJSON = function() {
    const {__v, _id, ...dietByWeek} = this.toObject();
    return {id: _id, ...dietByWeek};
}

module.exports = model('DietByWeek', DietByWeekSchema);