import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import  * as actions from './actions/todo';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: ''
    }
  }
  

  componentWillMount = () => {
    this.props.fetchTodoList();
  };
  
  handleOnChange = e => {
    const target = e.target;
    const key = target.name;
    const isCompleted = target.checked;

    this.props.updateTodo({
      id: key,
      isCompleted
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const key = target.name;
    const value = target.value;

    this.setState({ [key] : value });
  }

  addTodo = (e) => {
    e.preventDefault();

    if (this.state.task) {
      this.props.addTodo(this.state.task);
      this.setState({ task: '' });
    } else {
      alert('Please add task you need to do !');
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

    let r = window.confirm('Do you want to delete this to do ?');

    if (r) {
      this.props.deleteTodo(id);
    }

  }
  


  ToDoItem = (props) => {
    if (props.completed) {
      return (
        <li key={props.id} className="completed">
          <div className="form-check"> <label className="form-check-label"> <input key={props.id} name={props.id} onChange={(e) => this.handleOnChange(e)} className="checkbox" type="checkbox" checked={true} value={props.task}/>{props.task}<i className="input-helper"></i></label> </div> <i onClick={(e) => this.onDelete(e, props.id)} className="remove mdi mdi-close-circle-outline" />
        </li>
      );
    } else {
      return (
        <li key={props.id}>
          <div className="form-check"> <label className="form-check-label"> <input key={props.id} name={props.id} onChange={(e) => this.handleOnChange(e)} className="checkbox" type="checkbox" checked={false} value={props.task}/> {props.task} <i className="input-helper"></i></label> </div> <i onClick={(e) => this.onDelete(e, props.id)} className="remove mdi mdi-close-circle-outline" />
        </li>
      );
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.addTodo(e);
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
                    <h1 className="card-title">TO DO LIST</h1>
                    <div className="add-items d-flex"> <input name="task" value={this.state.task} onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) => this.handleInputChange(e)} type="text" className="form-control todo-list-input" placeholder="What do you need to do today?" /> <button onClick={(e) => this.addTodo(e)} className="add btn btn-primary font-weight-bold todo-list-add-btn">Add</button> </div>
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
    addTodo: (task) => dispatch(actions.addTodo(task)),
    deleteTodo: (id) => dispatch(actions.deleteTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
