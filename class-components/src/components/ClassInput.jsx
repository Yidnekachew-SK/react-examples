import { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      count: 2,
      isEdited: false,
      clickCount: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
      count: state.count + 1,
    }));
  }

  handleDelete(todo) {
    this.setState((state) => {
      const newTodo = state.todos.filter((t) => t != todo)
      return {...state, todos: newTodo, count: state.count - 1 } 
    });
  }

  handleEdit(e, todo) {
    if (this.state.clickCount === 0) {
      e.target.textContent = "Resubmit";
      this.setState((state) => ({...state, inputVal: todo, clickCount: 1}));
      console.log(this.state.clickCount)
    } else {
      this.setState((state) => {
        const newTodo = this.state.inputVal;
        const modifiedTodos = state.todos.map(t => 
          t === todo ? newTodo : t );

        e.target.textContent = "Edit"

        return {...state, todos: modifiedTodos, inputVal: '', clickCount: 0}
      })
    }
     
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <div key={`${todo}-container`}>
              <li key={todo}>{todo}</li>
              <button onClick={() => this.handleDelete(todo)}>Delete</button>
              <button onClick={() => this.handleEdit(event,todo)}>Edit</button>
            </div>
          ))}
        </ul>
        <p>{this.state.count} todos</p>
      </section>
    );
  }
}

export default ClassInput;
