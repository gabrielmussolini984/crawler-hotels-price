// 1- ñ ser capaz por causa que a checkin é maior que checkout
// 2- ñ ser capaz por causa que checkin e/ou checkout é menor que hoje.
// 3- capaz de trazer uma lista de quartos.
// 4- Trazer uma lista vazia
// 5- Erro ao trazer uma lista
import { mocked } from 'ts-jest/utils/';
import { PlaceService } from './place.service';

import { isBigger, afterToday } from './utils/validateDate';
import { getDateString } from './utils/getDateString';
import { Puppeteer } from './utils/puppeter';
// Validate Date
const expectedCrawler = [
  {
    images: [
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=189952.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152609.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=189950.jpg',
    ],
    title: 'Standard',
    description:
      'Ideal para relaxar. Os quartos dispõem de diversos serviços para garantir uma estadia confortável e agradável. Todos os apartamentos Stan... ',
    price: 'R$ 703,00',
  },
  {
    images: [
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152620.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152621.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=189959.jpg',
    ],
    title: 'Luxo',
    description:
      'Confortavelmente decorado para fazer da sua estadia um momento de prazer e bem-estar. Os quartos da categoria Luxo contam Ar climatizado,... ',
    price: 'R$ 750,50',
  },
  {
    images: [
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152623.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152624.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=152625.jpg',
    ],
    title: 'Luxo Superior',
    description:
      'Exclusividade e requinte. Todos os quartos luxo superior contam com Ar climatizado, TV LCD 32”, SKY, frigobar, telefone, cofre e secador ... ',
    price: 'R$ 845,50',
  },
  {
    images: [
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192355.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192356.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192357.jpg',
      '/Handlers/ImageLoader.ashx?sz=250x166&imageID=192358.jpg',
    ],
    title: 'Master',
    description:
      'São 6 quartos luxuosos, sofisticados e decorados com requinte, além de localização privilegiada em nosso hotel. Alguns possuem mezanino e... ',
    price: 'R$ 988,00',
  },
];
jest.mock('./utils/validateDate', () => ({
  isBigger: jest.fn(),
  afterToday: jest.fn(),
}));

jest.mock('./utils/getDateString', () => ({
  getDateString: jest.fn(),
}));

jest.mock('./utils/puppeter', () => ({
  Puppeteer: {
    startBrowser: jest.fn(async () => true),
    newPage: jest.fn(async () => true),
    getPlacesLeCanton: jest.fn(async () => expectedCrawler),
    closeBrowser: jest.fn(async () => true),
  },
}));
describe('PlaceService', () => {
  let placeService: PlaceService;

  beforeEach(() => {
    jest.resetModules();
    placeService = new PlaceService();
  });
  it('should be able bring available rooms.', async () => {
    const checkIn = new Date('2021-03-01');
    const checkOut = new Date('2021-03-02');

    const mockedIsBigger = mocked(isBigger);
    mockedIsBigger.mockImplementation(() => false);

    const mockedAfterToday = mocked(afterToday);
    mockedAfterToday.mockImplementation(() => true);

    const mockedGetDateString = mocked(getDateString);
    mockedGetDateString.mockImplementation(() => '01032021');

    const response = await placeService.getOfferts({ checkIn, checkOut });
    expect(response).toEqual(expect.arrayContaining(expectedCrawler));
  });

  it('should not be able bring available rooms because checkin > checkout.', async () => {
    const checkIn = new Date('2021-03-04');
    const checkOut = new Date('2021-03-02');
    const mockedIsBigger = mocked(isBigger);
    mockedIsBigger.mockImplementation(() => true);

    await expect(
      placeService.getOfferts({ checkIn, checkOut }),
    ).rejects.toThrowError('Check-out date must be greater than check-in date');
  });

  it('should not be able bring available rooms because checkin and/or checkout < new Date.', async () => {
    const checkIn = new Date('2020-03-04');
    const checkOut = new Date('2020-03-02');
    const mockedIsBigger = mocked(isBigger);
    mockedIsBigger.mockImplementation(() => false);
    const mockedAfterToday = mocked(afterToday);
    mockedAfterToday.mockImplementation(() => false);

    await expect(
      placeService.getOfferts({ checkIn, checkOut }),
    ).rejects.toThrowError(
      'The check-in and check-out date must be greater than the current date',
    );
  });
});
