import { isBigger, afterToday } from './validateDate';

describe('Valdiate Date', () => {
  it('Should be able to verify that the first date is greater', () => {
    const firstDate = new Date('2020-02-24');
    const secondDate = new Date('2020-02-20');
    expect(isBigger(firstDate, secondDate)).toBe(true);
  });
  it('Should be able to verify that the second date is greater', () => {
    const firstDate = new Date('2020-02-20');
    const secondDate = new Date('2020-02-24');
    expect(isBigger(firstDate, secondDate)).toBe(false);
  });
  it('Should be able to verify that the dates passed are later than today', () => {
    const firstDate = new Date('2021-02-29');
    const secondDate = new Date('2021-03-01');
    expect(afterToday([firstDate, secondDate])).toBe(true);
  });
  it('Should be able to verify that the past dates is earlier or equal to today', () => {
    const firstDate = new Date('2020-02-29');
    const secondDate = new Date('2020-03-01');
    expect(afterToday([firstDate, secondDate])).toBe(false);
  });
});
