import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import  * as actions from './actions/todo';


class App extends Component {

  componentWillMount = () => {
    this.props.fetchTodoList();
  };
  
  handleOnChange = e => {
    const target = e.target;
    const key = target.name;
    const isCompleted = target.checked;
    console.log(key, isCompleted);
    this.props.updateTodo({
      id: key,
      isCompleted
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const key = target.name;
    const value = target.value;

    console.log(key, value);
    //this.setState({ [key] : value })
  }

  addTodo = (e) => {
    if (this.state.task) {

    }
  }

  renderTodoItem = () => {
    if (this.props.todos) {
      return this.props.todos.map(item => {
        return this.ToDoItem(item);
      })
    }
  }

  onDelete = (e, id) => {
    e.preventDefault();

    alert(id);
  }
  


  ToDoItem = (props) => {
    console.log(props);
    if (props.completed) {
      return (
        <li className="completed">
          <div className="form-check"> <label className="form-check-label"> <input key={props.id} name={props.id} onChange={(e) => this.handleOnChange(e)} className="checkbox" type="checkbox" checked={true} value={props.task}/>{props.task}<i className="input-helper"></i></label> </div> <i onClick={(e) => this.onDelete(e, props.id)} className="remove mdi mdi-close-circle-outline" />
        </li>
      );
    } else {
      return (
        <li>
          <div className="form-check"> <label className="form-check-label"> <input key={props.id} name={props.id} onChange={(e) => this.handleOnChange(e)} className="checkbox" type="checkbox" value={props.task}/> {props.task} <i className="input-helper"></i></label> </div> <i onClick={(e) => this.onDelete(e, props.id)} className="remove mdi mdi-close-circle-outline" />
        </li>
      );
    }
  }

 
  render() {
    return (
      <div className="container">
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-lg-12">
                <div className="card px-3">
                  <div className="card-body">
                    <h4 className="card-title">To Do List</h4>
                    <div className="add-items d-flex"> <input name="task" onChange={(e) => this.handleInputChange(e)} type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" /> <button onClick={(e) => this.addTodo(e)} className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button> </div>
                    <div className="list-wrapper">
                      <ul className="d-flex flex-column-reverse todo-list">
                        {this.renderTodoItem()}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTodoList: () => dispatch(actions.fetchTodoList()),
    updateTodo: (todo) => dispatch(actions.updateTodo(todo)),
    addTodo: (task) => dispatch(actions.addTodo(task))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
