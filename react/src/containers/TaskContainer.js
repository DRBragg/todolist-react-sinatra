import React from 'react';
import TaskList from './../components/TaskList';
import TaskForm from './../components/TaskForm';

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: ""
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
  }

  async getTasks() {
    let responseJSON = await (await fetch('/api/v1/tasks')).json();

    this.setState({ tasks: responseJSON.tasks })
  }

  componentDidMount() {
    this.getTasks();
  }

  handleTaskChange(event) {
    this.setState({ newTask: event.target.value })
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    let jsonTask = await (await fetch('/api/v1/tasks', { method: 'POST', credentials: 'same-origin', body: this.state.newTask})).json();

    this.setState({
      tasks: this.state.tasks.concat([jsonTask])},
      this.handleClearForm()
    );
  }

  handleClearForm(event) {
    this.setState({
      newTask: ''
    })
  }

  render() {
    return (
      <div className="taskList">
        <h1>Task List</h1>
        <TaskList tasks={this.state.tasks}/>
        <TaskForm
          onChangeFunction={this.handleTaskChange}
          handleFormSubmit={this.handleFormSubmit}
          content={this.state.newTask}
        />
      </div>
    )
  }
}

export default TaskContainer
