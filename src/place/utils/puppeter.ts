import * as puppeteer from 'puppeteer';

export class Puppeteer {
  static async startBrowser(): Promise<puppeteer.Browser> {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      return browser;
    } catch (err) {
      throw new Error('Browser error');
    }
  }
  static closeBrowser(browser: puppeteer.Browser) {
    browser.close();
  }

  static async newPage(browser: puppeteer.Browser) {
    return browser.newPage();
  }

  static async getPlacesLeCanton(page: puppeteer.Page, url: string) {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 20000,
    });
    return page.evaluate(
      (): Promise<
        {
          title: string;
          description: string;
          images: Array<string>;
          price: string;
        }[]
      > => {
        const rooms = document.querySelectorAll('div.roomExcerpt');

        const places: {
          title: string;
          description: string;
          images: Array<string>;
          price: string;
        }[] = [];
        rooms.forEach((room) => {
          const images = [];
          room
            .querySelectorAll('div.slide img')
            .forEach((img) => images.push(img.getAttribute('src')));

          const title = room.querySelector('div.excerpt h5 a').textContent;
          const description = room.querySelector('a.description').textContent;
          const price = room.querySelector('h6.bestPriceTextColor').textContent;
          places.push({ images, title, description, price });
        });
        if (places.length == 0) {
          const noVacancies = document.querySelector('div.info-message h2');
          if (noVacancies) {
            return Promise.reject(noVacancies.textContent);
          }
          return Promise.reject('Internal');
        }
        return Promise.resolve(places);
      },
    );
  }
}
