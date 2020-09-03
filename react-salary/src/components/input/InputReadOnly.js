import React, { Component } from 'react';

export default class InputReadOnly extends Component {
  render() {
    const { calculus } = this.props;
    return (
      <div>
        <label>Base INSS:</label>
        <input
          type="text"
          readOnly
          value={`${calculus.baseINSS}`}
          style={{ fontWeight: 'bold' }}
        />
        <label>Desconto INSS:</label>
        <input
          type="text"
          readOnly
          value={`${calculus.discountINSS} (${calculus.percentINSS}%)`}
          style={{ color: '#e67e22', fontWeight: 'bold' }}
        />
        <label>Base IRPF:</label>
        <input
          type="text"
          readOnly
          value={`${calculus.baseIRPF} `}
          style={{ fontWeight: 'bold' }}
        />
        <label>Desconto IRPF:</label>
        <input
          type="text"
          readOnly
          value={`${calculus.discountIRPF} (${calculus.percentIRPF}%)`}
          style={{ color: '#c0392b', fontWeight: 'bold' }}
        />
        <label>Salário Líquido:</label>
        <input
          type="text"
          readOnly
          value={`${calculus.netSalary} (${calculus.percentNetSalary}%)`}
          style={{ color: '#16a085', fontWeight: 'bold' }}
        />
      </div>
    );
  }
}
