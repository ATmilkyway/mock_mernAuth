export const oneYearFromNow = () =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1yr

export const thirtyDaysFromNow = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 1month

export const fiftyMinutesFromNow = () => new Date(Date.now() + 15 * 60 * 1000); // 15min

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
