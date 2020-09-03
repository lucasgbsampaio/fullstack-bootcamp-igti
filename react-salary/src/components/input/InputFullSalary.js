import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  handleChangeInput = (event) => {
    const newValue = event.target.value;
    this.props.onChangeSalary(newValue);
  };

  render() {
    const { defaultValue } = this.props;
    return (
      <div>
        <label>Salário Bruto:</label>
        <input
          type="number"
          value={defaultValue}
          onChange={this.handleChangeInput}
          min="1000"
          step="100"
          style={{ fontWeight: 'bold' }}
        />
      </div>
    );
  }
}
