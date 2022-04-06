import React, { Component } from 'react';
//componente de toda la aplicacion
class App extends Component{
    constructor(){
        super();
        //cuando comience la aplicacion los datos en blanco
        this.state = {
            title: '',
            description: '',
            tasks:[],
            _id:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    addTask(e){
       if(this.state._id)// si existe id hago peticion 
       {// peticion de actualizacion al servidor pasandole el id
            fetch(`/api/tasks/${this.state._id}`, {
               method: 'PUT',
               body:JSON.stringify(this.state),
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Task updated'});
                //limpiar formulario
                this.setState({title: '', description: '', _id: '' });
                this.fetchTasks();
            });
       }else{
            //enviar los datos fetch envia una peticion al servidor
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(this.state),//le envia el estado 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        //cuando responda quiero ver por consola
        .then(res =>res.json())//mirar el mensaje que el servidor esta dando
        .then(data => {
            console.log(data)
            M.toast({html:'Task saved'});//mensaje por pantalla con materialize
            //limpiar formulario 
            this.setState({title: '', description: ''});
            this.fetchTasks();
        })
        .catch(err => console.error(err));
       }
        //console.log(this.state);
        e.preventDefault();
    }
    // este componente es para que apenas  la aplicacion este montada  utilice le evento llamado fetchTasks
    componentDidMount() {
        //console.log('el componente fue montado');
        this.fetchTasks();
    }
    //obtener tareas 
    fetchTasks(){
        //consulta al servidor
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data =>{
            
            this.setState({tasks: data});//cambia el estado de la aplicacion
            console.log(this.state.tasks);
        });

    }
    deleteTask(id){
        if(confirm('are you sure you want to delete it?')){
            // consulta a bd para eliminar
        fetch(`/api/tasks/${id}`,{
            method: 'DELETE', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            M.toast({html:'Task Deleted'});// mensaje 
            this.fetchTasks();// carga los datos

        }); 
        }

    }
    editTask(id){
        
        //consulta bd
        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // actualizar datos 
            this.setState({
                title: data.title, 
                description: data.description,
                _id: data._id

            })

        });
            

    }
    //cada vez usuario tipea algo captura cambios
    // obtener cada input y sus valores
    handleChange(e){
        //destructuring
     const {name, value} = e.target;
     this.setState({
         [name]:value// aqui sera un title o description
     });
    }


    render(){
        return(
            <div>
                {/* NAVEGACION*/}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                          <div className="card">
                              <div className="card-content">
                                  <form onSubmit={this.addTask}>
                                      < div className="row">
                                          <div className="input-field col s12">
                                              <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}/>

                                          </div>

                                      </div>

                                      < div className="row">
                                          <div className="input-field col s12">
                                              <textarea name="description" onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea" value={this.state.description}></textarea>

                                          </div>

                                      </div>
                                      <button  type="submit"className="btn light-blue darken-4">
                                          send
                                      </button>
                                  </form>

                              </div>

                          </div>
                

                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title </th>
                                        <th>Description </th>
                                          
                                    </tr>
                                </thead>
                                <tbody>
                                    { //recorrer cada una de tareas y por cada elemento retorno una fila
                                        this.state.tasks.map(task =>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=>this.deleteTask(task._id)}>
                                                           <i className="material-icons">delete</i>

                                                        </button>
                                                        <button onClick={()=>this.editTask(task._id)} className="btn light-blue darken-4"style={{margin: '4px'}}>
                                                        <i className="material-icons">edit</i>

                                                        </button>
                                                    </td>
                                                </tr>
                                            )

                                        })
                                    }

                                </tbody>
                            </table>

                        </div>

                    </div>
                    

                </div>
            </div>
        )
    }
}
export default App;