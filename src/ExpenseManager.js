import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';

class ExpenseManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      description: '',
      value: '',
      status: false,
      date: '',
      expenses: [],
      index: -1,
    };

    this.handleDescription = this.handleDescription.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleForm = this.handleForm.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
  }

  generateId() {
    return this.state.expenses.length + 1;
  }

  updateExpense() {
    this
    .state
    .expenses
    .splice(
              this.state.index,
              1,
              {
                id: this.state.id,
                description: this.state.description,
                value: this.state.value,
                status: this.state.status,
                date: this.state.date,
              }
            );
    this.setState({
      index: -1,
    });
  }

  newExpense() {
    this.state.expenses.push(
      {
        id: this.generateId(),
        description: this.state.description,
        value: this.state.value,
        status: this.state.status,
        date: Date.now(),
      }
    );
  }

  handleDescription(description) {
    this.setState({
      description: description,
    });
  }

  handleValue(value) {
    this.setState({
      value: value,
    });
  }

  handleStatus() {
    this.setState({
      status: !this.state.status,
    });
  }

  handleForm() {
    if(this.state.index === -1) {
      this.newExpense();
    } else {
      this.updateExpense();
    }
    this.setState({
      id: '',
      description: '',
      value: '',
      status: false,
      date: '',
    });
  }

  handleEdit(id) {
    var index = this.state.expenses.findIndex((expense) => { return expense.id === id });
    this.setState({
      index: index,
    });
    var expense = this.state.expenses[index];
    this.setState({
      id: expense.id,
      description: expense.description,
      value: expense.value,
      status: expense.status,
      date: expense.date,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="expense-manager">
          <div className="row">
            <Col md={6}>
              <ExpenseForm
                description={this.state.description}
                value={this.state.value}
                status={this.state.status}
                onDescription={this.handleDescription}
                onValue={this.handleValue}
                onStatus={this.handleStatus}
                onForm={this.handleForm}
              />
            </Col>
            <Col md={6}>
              <ExpenseTable
                expenses={this.state.expenses}
                onEdit={this.handleEdit}
              />
            </Col>
          </div>
          <div className="row">
            <Col md={12}>
              <div className="github">
                <a className="github-button" href="https://github.com/jgcmarins/react-expense-manager" data-size="large" data-show-count="true" aria-label="Star jgcmarins/react-expense-manager on GitHub">Star</a>
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default ExpenseManager;
