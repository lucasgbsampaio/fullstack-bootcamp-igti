function round(value) {
  return +value.toFixed(2);
}

function calculateInstallments(capital, interest, period) {
  const installments = [];
  for (let i = 1; i <= period; i++) {
    const amountMounth = round(capital * Math.pow(1 + interest / 100, i));
    const interestMounth = round(amountMounth - capital);
    const percentMounth = round((interestMounth / amountMounth) * 100);

    installments.push({
      id: i,
      amountMounth,
      interestMounth,
      percentMounth,
    });
  }
  return installments;
}

export { calculateInstallments };
