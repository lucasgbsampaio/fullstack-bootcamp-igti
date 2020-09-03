import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Installment from './components/Installment';
import { calculateInstallments } from './calculs';

export default function App() {
  const [capital, setCapital] = useState(1000);
  const [interest, setInterest] = useState(0.5);
  const [period, setPeriod] = useState(1);
  const [installments, setInstallments] = useState(
    calculateInstallments(capital, interest, period)
  );

  useEffect(() => {
    setInstallments(calculateInstallments(capital, interest, period));
  }, [capital, interest, period]);

  return (
    <div className="container center">
      <h1>React - Juros Compostos</h1>

      <div className="row" style={styles.flexRowStyle}>
        <Form
          onChangeCapital={(event) => setCapital(event)}
          onChangeInterest={(event) => setInterest(event)}
          onChangePeriod={(event) => setPeriod(event)}
          capital={capital}
          interest={interest}
          period={period}
        />

        <div>
          {installments.map((installment) => (
            <Installment key={installment.id} installment={installment} />
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
};
