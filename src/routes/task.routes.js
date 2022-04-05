// requiero express para las rutas
const express = require ('express');
const router = express.Router();//devuelve un objeto en el cual puedo ingresar rutas

const Task = require('../models/task');
//consulta a bd 
router.get('/', async (req,res)=>{
   const tasks =  await Task.find() //los guarda
        //console.log(tasks);
        res.json(tasks);
   
   
});
//obtener una unica tarea basada en id
router.get('/:id', async(req,res)=>{
    const task = await Task.findById(req.params.id)
    res.json(task);
});
//metodo agregar datos, en este caso tareas
router.post('/', async (req, res) =>{
    //console.log(req.body);
    const { title, description } = req.body;
   const task = new Task({title, description});
   await task.save()
  res.json({status:'Task saved'});

});
//actualizar
router.put('/:id', async (req, res)=>{
    //obtener los nuevos datos del cliente
    const {title, description} = req.body;
    const newTask = {title, description};
    //tarea a actualizar por id con newTask tarea que voy a actualizar
    await Task.findByIdAndUpdate(req.params.id, newTask );
    //console.log(req.params.id);
    res.json({status:'Task update'});

});
//eliminar
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Task Deleted'});
  });

module.exports = router;