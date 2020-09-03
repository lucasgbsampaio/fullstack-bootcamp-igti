import React from 'react';

export default function Form({
  capital,
  interest,
  period,
  onChangeCapital,
  onChangeInterest,
  onChangePeriod,
}) {
  const handleCapital = (event) => {
    const value = event.target.value;
    onChangeCapital(value);
  };
  const handleInterest = (event) => {
    const value = event.target.value;
    onChangeInterest(value);
  };
  const handlePeriod = (event) => {
    const value = event.target.value;
    onChangePeriod(value);
  };
  return (
    <div>
      <label>
        {' '}
        Capital inicial:
        <input
          type="number"
          min="1000"
          max="100000"
          step="100"
          value={capital}
          onChange={handleCapital}
        />
      </label>
      <label>
        {' '}
        Taxa de juros mensal:
        <input
          type="number"
          min="-12"
          max="12"
          step="0.5"
          value={interest}
          onChange={handleInterest}
        />
      </label>
      <label>
        {' '}
        Período (meses):
        <input
          type="number"
          min="1"
          max="36"
          step="1"
          value={period}
          onChange={handlePeriod}
        />
      </label>
    </div>
  );
}
