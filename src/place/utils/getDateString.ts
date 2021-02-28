export function getDateString(date: Date): string {
  try {
    const dateConveted = date
      .toJSON()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('');
    return dateConveted;
  } catch (error) {
    throw new Error('Convert Date Error');
  }
}
