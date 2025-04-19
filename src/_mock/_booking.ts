import _mock from './_mock';
import { randomInArray } from './funcs';

// ----------------------------------------------------------------------
function randomFrom(arr: any) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function randomHostname() {
  const words = ["alpha", "beta", "gamma", "delta", "omega", "server", "node"];
  const randWord = randomFrom(words);
  const randNum = Math.floor(Math.random() * 1000);
  return `${randWord}-${randNum}`;
}

const generateRandomIp = () => {
  const getOctet = () => Math.floor(Math.random() * 256); // 0 - 255
  return `${getOctet()}.${getOctet()}.${getOctet()}.${getOctet()}`;
};

function generateRandomData() {
  const memoryOptions = ["512 MB", "1 GB", "2 GB", "4 GB", "8 GB"];
  const storageOptions = ["4 GB", "8 GB", "16 GB", "32 GB"];
  const cpuOptions = ["1 Core", "2 Cores", "4 Cores", "8 Cores"];
  const bandwidthOptions = ["∞", "10 Mbps", "100 Mbps", "1 Gbps"];

  const randomSpec = [
    {
      icon: "mdi:memory",
      label: memoryOptions[Math.floor(Math.random() * memoryOptions.length)],
    },
    {
      icon: "mdi:harddisk",
      label: storageOptions[Math.floor(Math.random() * storageOptions.length)],
    },
    {
      icon: "mdi:cpu-64-bit",
      label: cpuOptions[Math.floor(Math.random() * cpuOptions.length)],
    },
    {
      icon: "mdi:swap-horizontal",
      label: bandwidthOptions[Math.floor(Math.random() * bandwidthOptions.length)],
    },
  ];

  return randomSpec;
}
export const _bookings = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  checkIn: _mock.time(index),
  checkOut: _mock.time(index),
  ip: generateRandomIp(),
  status: randomInArray(['Running', 'Pending', 'Rebooting', 'Stopped']),
  hostName: randomHostname(),
  infomation: generateRandomData()
}));

export const _bookingsOverview = [...Array(3)].map((_, index) => ({
  status: ['Pending', 'Cancel', 'Done'][index],
  quantity: _mock.number.percent(index) * 1000,
  value: _mock.number.percent(index),
}));

export const _bookingReview = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  description: _mock.text.description(index),
  avatar: _mock.image.avatar(index),
  rating: _mock.number.rating(index),
  postedAt: _mock.time(index),
  tags: ['Great Sevice', 'Recommended', 'Best Price'],
}));

export const _bookingNew = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  bookdAt: _mock.time(index),
  roomNumber: 'A-21',
  roomType: randomInArray(['double', 'king', 'single']),
  person: '3-5',
  cover: `https://minimal-assets-api-dev.vercel.app/assets/images/rooms/room-${index + 1}.jpg`,
}));
