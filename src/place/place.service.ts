import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getDateString } from './utils/getDateString';
import { Puppeteer } from './utils/puppeter';
import { afterToday, isBigger } from './utils/validateDate';

@Injectable()
export class PlaceService {
  public async getOfferts({
    checkIn,
    checkOut,
  }: {
    checkIn: Date;
    checkOut: Date;
  }) {
    if (isBigger(checkIn, checkOut)) {
      throw new HttpException(
        'Check-out date must be greater than check-in date',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!afterToday([checkIn, checkOut])) {
      throw new HttpException(
        'The check-in and check-out date must be greater than the current date',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // Convert to crawler accept
    const convertedCheckIn = getDateString(checkIn);
    const convertedCheckOut = getDateString(checkOut);
    const browser = await Puppeteer.startBrowser();
    const newPage = await Puppeteer.newPage(browser);
    const path = `CheckIn=${convertedCheckIn}&CheckOut=${convertedCheckOut}`;
    try {
      const placesLeCanton = await Puppeteer.getPlacesLeCanton(
        newPage,
        `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation&sid=ed6e9b64-477d-4217-88fc-dd3629400072#/&diff=false&${path}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`,
      );
      Puppeteer.closeBrowser(browser);
      return placesLeCanton;
    } catch (error) {
      await browser.close();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
