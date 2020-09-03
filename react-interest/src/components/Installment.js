import React from 'react';

export default function Installment({ installment }) {
  return (
    <div style={{ padding: '20px' }}>
      <div>
        <span>{installment.id}</span>
      </div>
      <div>
        <span>{installment.amountMounth}</span>
      </div>
      <div>
        <span>{installment.interestMounth}</span>
      </div>
      <div>
        <span>{installment.percentMounth}</span>
      </div>
    </div>
  );
}
