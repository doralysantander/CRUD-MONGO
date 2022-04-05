import React, { Component } from 'react';
//componente de toda la aplicacion
class App extends Component{
    constructor(){
        super();
        //cuando comience la aplicacion los datos en blanco
        this.state = {
            title: '',
            description: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    addTask(e){
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
        })
        .catch(err => console.error(err));
        //console.log(this.state);
        e.preventDefault();
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

                        </div>

                    </div>
                    

                </div>
            </div>
        )
    }
}
export default App;