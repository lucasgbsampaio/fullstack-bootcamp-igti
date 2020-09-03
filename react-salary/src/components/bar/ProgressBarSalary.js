import React, { Component } from 'react';

export default class ProgressBarSalary extends Component {
  render() {
    const { value, color } = this.props;

    return (
      <div
        style={{
          marginTop: '40px',
          width: value + '%',
          height: '30px',
          backgroundColor: color,
        }}
      />
    );
  }
}
