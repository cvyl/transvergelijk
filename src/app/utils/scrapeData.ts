import axios from 'axios';
import cheerio from 'cheerio';
import { HospitalData } from '../../types/hospitalData';

// Function to scrape data from Psychologenpraktijk De Vaart
const scrapeDeVaart = async (): Promise<HospitalData[]> => {
  const url = 'https://psychologenpraktijkdevaart.nl/praktijkinfo/wachtlijst-bggz-en-sggz/';
  const data: HospitalData[] = [];

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  $('table').each((_, table) => {
    let location = '';
    $(table).prev('p').each((_, p) => {
      location = $(p).text().trim();
    });

    $(table).find('tr').each((_, row) => {
      const columns = $(row).find('td');
      if (columns.length >= 2) {
        const specialization = $(columns[0]).text().trim();
        const intakeTime = $(columns[1]).text().trim();

        // Skip entries with "regulier" in specialization
        if (specialization && intakeTime && !specialization.toLowerCase().includes('behandeling') && !specialization.toLowerCase().includes('regulier')) {
          data.push({
            hospital: 'Psychologenpraktijk De Vaart',
            specialization,
            location,
            intakeTime
          });
        }
      }
    });
  });

  return data;
};

// Function to scrape data from UMCG
const scrapeUMCG = async (): Promise<HospitalData[]> => {
  const url = 'https://www.umcg.nl/w/wachttijden-genderteam';
  const data: HospitalData[] = [];

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  $('table tbody tr').each((_, row) => {
    const columns = $(row).find('td');
    const specialization = $(row).find('th').text().trim();
    if (columns.length > 0 && specialization) {
      const intakeTime = $(columns[0]).text().trim();
      const treatmentTime = columns.length > 3 ? $(columns[3]).text().trim() : '';

      if (specialization && intakeTime && !specialization.toLowerCase().includes('behandeling')) {
        data.push({
          hospital: 'UMCG',
          specialization,
          location: 'Groningen',
          intakeTime,
        });
      }
    }
  });

  return data;
};

// Combined function to scrape data from both websites
export const scrapeData = async (): Promise<HospitalData[]> => {
  const deVaartData = await scrapeDeVaart();
  const umcgData = await scrapeUMCG();
  return [...deVaartData, ...umcgData];
};
