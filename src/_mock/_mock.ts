import { sub } from 'date-fns';
//
import { role } from './role';
import { email } from './email';
import { boolean } from './boolean';
import { company } from './company';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { firstName, lastName, fullName } from './name';
import { title, sentence, description } from './text';
import { price, rating, age, percent } from './number';

// ----------------------------------------------------------------------
const generateRandomIp = () => {
  const getOctet = () => Math.floor(Math.random() * 256); // 0 - 255
  return `${getOctet()}.${getOctet()}.${getOctet()}.${getOctet()}`;
};
function randomFrom(arr: any) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomHostname() {
  const words = ["alpha", "beta", "gamma", "delta", "omega", "server", "node"];
  const randWord = randomFrom(words);
  const randNum = Math.floor(Math.random() * 1000);
  return `${randWord}-${randNum}`;
}
const _mock = {
  id: (index: number) => `Server-${index + 1}`,
  email: (index: number) => email[index],
  phoneNumber: (index: number) => phoneNumber[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => boolean[index],
  role: (index: number) => role[index],
  company: (index: number) => company[index],
  address: {
    fullAddress: (index: number) => fullAddress[index],
    country: (index: number) => country[index],
  },
  name: {
    firstName: (index: number) => firstName[index],
    lastName: (index: number) => lastName[index],
    fullName: (index: number) => fullName[index],
  },
  text: {
    title: (index: number) => title[index],
    sentence: (index: number) => sentence[index],
    description: (index: number) => description[index],
  },
  number: {
    percent: (index: number) => percent[index],
    rating: (index: number) => rating[index],
    age: (index: number) => age[index],
    price: (index: number) => price[index],
  },
  ip: generateRandomIp(),
  image: {
    cover: (index: number) =>
      `https://minimal-assets-api-dev.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
    feed: (index: number) =>
      `https://minimal-assets-api-dev.vercel.app/assets/images/feeds/feed_${index + 1}.jpg`,
    product: (index: number) =>
      `https://minimal-assets-api-dev.vercel.app/assets/images/products/product_${index + 1}.jpg`,
    avatar: (index: number) =>
      `https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
  hostName: randomHostname()
};

export default _mock;
