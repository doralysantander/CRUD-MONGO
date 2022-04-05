// codigo del servidor
// requiere el modulo express
const express = require('express');
const morgan = require('morgan');
const path = require('path');//unir directorios

//const { dirname } = require('path');
const app = express();

// conexion
const { mongoose } = require('./database');

//settings
//tome el puerto del servicio de la nube o que tome por defecto el 3000
app.set('port', process.env.PORT || 5025);
//comprueba si es un formato json



//middlewares funciones  se jecutan antes de llegar a alas rutas
app.use(morgan('dev'));
app.use(express.json());


//routes urls servidor
app.use('/api/tasks', require('./routes/task.routes'));

// statuc files  archivos estaticos
// carpeta static esta en esta direccion

app.use(express.static(path.join(__dirname, 'public')));
//console.log(path.join(__dirname +'/public'))


// servidor escucha en el puerto
app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);








});
