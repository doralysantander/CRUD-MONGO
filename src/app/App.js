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
        this.addTask = this.addTask.bind(this);
    }
    addTask(e){
        console.log(this.state);
        e.preventDefault();
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
                                              <input type="text" placeholder="Task title"/>

                                          </div>

                                      </div>

                                      < div className="row">
                                          <div className="input-field col s12">
                                              <textarea placeholder="Task Description" className="materialize-textarea"></textarea>

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