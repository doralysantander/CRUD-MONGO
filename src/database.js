const mongoose = require('mongoose');
//const URI = 'mongodb://localhost/BDPRUEBA'
const URI = 'mongodb+srv://doraly:bd123@cluster0.23cnr.mongodb.net/bdtodo?retryWrites=true&w=majority';
mongoose.connect(URI)
.then(db => console.log('BD is connected'))
.catch(err => console.error(err));



module.exports = mongoose;