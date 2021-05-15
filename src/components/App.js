import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoList from './ToDoList';
import NavBar from './NavBar';
import AddTask from './AddTask';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import InitialData from '../data/InitialData'
//import uniqueId from 'uniqueid';
import { v4 as uuidv4 } from 'uuid';
import Fetching from './Fetching';

class App extends React.Component{
  state = {
    tasks: [],
    fetching: true
  }

  onToggleCompleted = (taskId) => {
    let taskToUpdate = this.state.tasks.find(task => task.id === taskId);
    taskToUpdate.completed = !taskToUpdate.completed;

    this.setState(prevState => {
      prevState.tasks.map(task =>{
        return task.id === taskId ? taskToUpdate : task
      } )
    })
  }

  onAddTask = (newTaskName) =>{
    let newTask = {
      id: uuidv4(), // uniqueid('prefix')
      name: newTaskName, 
      completed: false
    }

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask]
    }))
  }

  onDeleteCompleted = () =>{
    this.setState(prevState => {
      let newState = prevState.tasks.filter(task => !task.completed)
      return{
        tasks : newState
      } 
    })
  }

  componentDidMount = () =>{
    // simulate retrieve data from the server with setTimeout
    let delay = Math.floor(Math.random()*5000)
    setTimeout(() => {
      this.setState({
        fetching : false,
        tasks: InitialData
      })
    }, delay)
  }

  render() {
    console.log('Bonjour render');
    return (
      <section id="todo">
        {this.state.fetching ? <Fetching />: null}
        <Router>
          <Switch>
            <Route path="/add-task" render ={(props => <AddTask {...props} onAddTask={this.onAddTask} />)} />
            <Route path="/:filter?" render ={(props)=> <ToDoList {...props} tasks={this.state.tasks} onToggleCompleted={this.onToggleCompleted} />} />
          </Switch>
          <NavBar onDeleteCompleted={this.onDeleteCompleted} />
        </Router>
        
    </section>
    )}
}

export default App;
