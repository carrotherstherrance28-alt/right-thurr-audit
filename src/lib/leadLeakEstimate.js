const clampNumber = (value, min, max) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return min;
  }

  return Math.min(Math.max(numericValue, min), max);
};

export const leadLeakAssumptions = [
  'Monthly inbound leads are all new opportunities before qualification.',
  'Estimated leak rate is the share that receives slow, missed, or unclear follow-up.',
  'Average booked job value uses revenue, not profit or lifetime value.',
  'Close rate applies only to leaked leads that could be recovered with better follow-up.',
];

export function calculateLeadLeakEstimate({
  monthlyLeads,
  responseLeakRate,
  averageJobValue,
  closeRate,
}) {
  const leads = clampNumber(monthlyLeads, 0, 10000);
  const leakRate = clampNumber(responseLeakRate, 0, 100) / 100;
  const jobValue = clampNumber(averageJobValue, 0, 100000);
  const recoveredCloseRate = clampNumber(closeRate, 0, 100) / 100;

  const leakedLeads = Math.round(leads * leakRate);
  const recoverableLeads = Math.round(leakedLeads * recoveredCloseRate);
  const monthlyOpportunity = Math.round(recoverableLeads * jobValue);

  return {
    leakedLeads,
    recoverableLeads,
    monthlyOpportunity,
    annualOpportunity: monthlyOpportunity * 12,
  };
}
