/**
 * Compound annuity (KPR) formula.
 * @param {number} price - Total property price (Rp)
 * @param {number} dpPercent - Down payment as percentage (e.g. 20)
 * @param {number} tenorYears - Loan tenor in years
 * @param {number} annualInterest - Annual interest rate in percent (e.g. 6.5)
 */
export function calculateMortgage({ price, dpPercent, tenorYears, annualInterest }) {
  const dpAmount = price * (dpPercent / 100);
  const loanAmount = price - dpAmount;

  const r = annualInterest / 100 / 12;
  const n = tenorYears * 12;

  let monthlyInstalment = 0;
  if (r > 0) {
    monthlyInstalment = (loanAmount * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  } else {
    monthlyInstalment = loanAmount / n;
  }

  return { dpAmount, loanAmount, monthlyInstalment };
}
