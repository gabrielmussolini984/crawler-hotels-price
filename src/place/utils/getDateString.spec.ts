import { getDateString } from './getDateString';

describe('Get Date in String', () => {
  it('should be defined', () => {
    const date = new Date('2020-02-24');
    const convertedDate = getDateString(date);
    expect(convertedDate).toBe('24022020');
  });
});
