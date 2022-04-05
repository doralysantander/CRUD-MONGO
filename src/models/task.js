// requiere moongose para modelar bd
const mongoose = require('mongoose');
const { Schema } = mongoose;// definir el esquema de datos
const TaskSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true}
});
//reutilizar dentro de mi aplicacion
module.exports = mongoose.model('Task',TaskSchema);


