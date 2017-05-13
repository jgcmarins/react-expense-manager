import React, { Component } from 'react';
import { Table, Label, Alert } from 'react-bootstrap';

class ExpenseRow extends Component {
  constructor(props) {
    super(props);

    this.handleEditClickRow = this.handleEditClickRow.bind(this);
  }

  handleEditClickRow(e) {
    e.preventDefault();
    this.props.onEditClick(this.props.id);
  }

  render() {
    var status = this.props.expense.status ? <Label bsStyle="primary">paid</Label> : <Label bsStyle="danger">not paid</Label>;
    var moment = require('moment');
    return (
      <tr onClick={this.handleEditClickRow}>
        <td>{this.props.expense.description}</td>
        <td>{this.props.expense.value}</td>
        <td>{status}</td>
        <td>{moment(this.props.expense.date).format("DD/MM/YYYY HH:mm")}</td>
      </tr>
    );
  }
}

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleEditClick(id) {
    this.props.onEdit(id);
  }

  render() {
    var rows = [];
    this.props.expenses.forEach((expense) => {
      rows.push(<ExpenseRow
                  expense={expense}
                  id={expense.id}
                  key={expense.id}
                  onEditClick={this.handleEditClick}
                />
      );
    });

    return (
      <div className="expense-table">
        <h3>Expense List</h3>
        <Alert>You can also edit an expense by clicking on it</Alert>
        <Table responsive bordered>
          <thead>
            <tr>
              <th>Description</th>
              <th>Value ($)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default ExpenseTable;
