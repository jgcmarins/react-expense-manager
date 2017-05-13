import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Button } from 'react-bootstrap';


class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  getValidationStateDescription() {
    if(this.props.description.length === 0) return null;
    else if(this.props.description.length < 3) return 'error';
    else return 'success';
  }

  getValidationStateValue() {
    if(this.props.value.length === 0) return null;
    else if(isNaN(this.props.value)) return 'error';
    else return 'success';
  }

  handleDescriptionChange(e) {
    e.preventDefault();
    this.props.onDescription(e.target.value);
  }

  handleValueChange(e) {
    e.preventDefault();
    this.props.onValue(e.target.value);
  }

  handleStatusChange(e) {
    this.props.onStatus();
  }

  getValidation() {
    if(this.getValidationStateDescription() === 'error' || this.getValidationStateValue() === 'error') return false;
    else if(this.getValidationStateDescription() === null || this.getValidationStateValue() === null) return false;
    return true;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if(this.getValidation()) this.props.onForm();
    else {
      alert('Please, fill the fields correctly.');
    }
  }

  render() {
    return (
      <div className="expense-form">
        <h3>Expense Info</h3>
        <form onSubmit={this.handleFormSubmit}>
          <FormGroup
            controlId="description"
            validationState={this.getValidationStateDescription()}
          >
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              value={this.props.description}
              placeholder="Type something that describes the expense"
              onChange={this.handleDescriptionChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Must have at least 3 characters</HelpBlock>
          </FormGroup>

          <FormGroup
            controlId="value"
            validationState={this.getValidationStateValue()}
          >
            <ControlLabel>Value ($)</ControlLabel>
            <FormControl
              type="text"
              value={this.props.value}
              placeholder="Insert value"
              onChange={this.handleValueChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Must be a number</HelpBlock>
          </FormGroup>

          <Checkbox
            onClick={this.handleStatusChange}
            checked={this.props.status}
          >
            Is paid?
          </Checkbox>

          <Button
            type="submit"
          >
            Save
          </Button>

        </form>

      </div>
    );
  }
}

export default ExpenseForm;
