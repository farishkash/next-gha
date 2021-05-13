import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

const eventListSample = [
  {
    name: 'Happy Hour',
    eventDate: '2021-04-29',
    location: 'The Dev Snack Shack',
    description:
      'Join us for our monthly happy hour! Just a time for us to take a break from work, eat some food, and enjoy the company of like-minded developers.',
    featuredImage: { url: '/images/featured-3.jpg' },
    slug: 'happy-hour-april-2021',
  },
  {
    name: 'Happy Hour',
    eventDate: '2022-04-21',
    location: 'The Dev Snack Shack',
    description:
      'Join us for our monthly happy hour! Just a time for us to take a break from work, eat some food, and enjoy the company of like-minded developers.',
    featuredImage: { url: '/images/featured-3.jpg' },
    slug: 'happy-hour-april-2022',
  },
  {
    name: 'Meet the Devs: Netscape',
    eventDate: '2021-02-10',
    location: 'Virtual',
    speakers: ['Dina Net Scapio', 'Tunde Abebe'],
    description:
      'Netscape, the birthplace of JavaScript. Do not miss this once-in-a-lifetime installment of Meet the Devs as we get to talk to members of the original team behind the language you all use to this day.',
    featuredImage: { url: '/images/featured-1.jpg' },
    slug: 'meet-the-devs-netscape-2021',
  },
];

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('Home', () => {
  it('renders without crashing', () => {
    const [featuredEvent, ...events] = eventListSample;
    render(<Home featuredEvent={featuredEvent} upcomingEvents={events} />);
    expect(
      screen.getByRole('heading', { name: 'Upcoming Events' }),
    ).toBeInTheDocument();
  });
});
