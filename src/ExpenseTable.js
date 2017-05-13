import React, { Component } from 'react';
import { Table, Label, Alert, Nav, NavItem } from 'react-bootstrap';

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
        <td className={this.props.status}>{status}</td>
        <td>{moment(this.props.expense.date).format("DD/MM/YYYY HH:mm")}</td>
      </tr>
    );
  }
}

class ExpenseNav extends Component {
  constructor(props) {
    super(props);

    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  handleSelectTab(eventKey) {
    event.preventDefault();
    this.props.onSelectTab(eventKey);
  }

  render() {
    return (
      <Nav bsStyle="tabs" activeKey={this.props.tab} onSelect={this.handleSelectTab}>
        <NavItem eventKey="1" title="All"><Label bsStyle="warning">all</Label></NavItem>
        <NavItem eventKey="2" title="Paid"><Label bsStyle="primary">paid</Label></NavItem>
        <NavItem eventKey="3" title="NotPaid"><Label bsStyle="danger">not paid</Label></NavItem>
      </Nav>
    );
  }
}

class ExpenseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: '1',
      status: '',
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleEditClick(id) {
    this.props.onEdit(id);
  }

  handleSelect(eventKey) {
    var status = '';
    if(eventKey !== '1') {
      status = 'status';
    }
    this.setState({
      tab: eventKey,
      status: status,
    });
  }

  prepareRows() {
    var expenses = this.props.expenses.slice();
    if(this.state.tab === '1') {
      return expenses;
    } else {
      var rows = [];
      expenses.forEach((expense) => {
        if(this.state.tab === '2' & expense.status) {
          rows.push(expense);
        } else if(this.state.tab === '3' & !expense.status) {
          rows.push(expense);
        }
      });
      return rows;
    }
  }

  render() {
    var expenses = this.prepareRows();
    var rows = [];
    expenses.forEach((expense) => {
      rows.unshift(
        <ExpenseRow
          expense={expense}
          id={expense.id}
          key={expense.id}
          status={this.state.status}
          onEditClick={this.handleEditClick}
        />
      );
    });

    return (
      <div className="expense-table">
        <h3>Expense List</h3>
        <Alert>You can also edit an expense by clicking on it</Alert>

        <ExpenseNav
          tab={this.state.tab}
          onSelectTab={this.handleSelect}
        />

        <Table responsive bordered>
          <thead>
            <tr>
              <th>Description</th>
              <th>Value ($)</th>
              <th className={this.state.status}>Status</th>
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
