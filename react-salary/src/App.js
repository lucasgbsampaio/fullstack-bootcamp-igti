import React, { Component } from 'react';
import InputFullSalary from './components/input/InputFullSalary.js';
import InputReadOnly from './components/input/InputReadOnly.js';
import { calculateSalaryFrom } from './helpers/salary.js';
import ProgressBarSalary from './components/bar/ProgressBarSalary.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
    this.calculus = 0;
  }

  handleFullSalary = (newValue) => {
    this.setState({
      fullSalary: newValue,
    });
  };

  render() {
    const { fullSalary } = this.state;
    this.calculus = calculateSalaryFrom(fullSalary);

    return (
      <>
        <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>
          React Salary
        </h1>
        <InputFullSalary
          defaultValue={fullSalary}
          onChangeSalary={this.handleFullSalary}
        />
        <InputReadOnly calculus={this.calculus} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProgressBarSalary
            value={this.calculus.percentINSS}
            color="#e67e22"
          />
          <ProgressBarSalary
            value={this.calculus.percentIRPF}
            color="#c0392b"
          />
          <ProgressBarSalary
            value={this.calculus.percentNetSalary}
            color="#16a085"
          />
        </div>
      </>
    );
  }
}
