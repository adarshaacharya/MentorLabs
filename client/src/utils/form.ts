import { countries } from 'data';

export function convertStringToArray(str: string) {
  return str.split(' ');
}

export function countryEmoji(name: string) {
  const findCountry = countries.find((country) => country.name === name);
  return findCountry.emoji;
}
