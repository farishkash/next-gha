import { render, screen, within, cleanup } from '@testing-library/react';
import UpcomingEvents from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
  cleanup();
});

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

describe('UpcomingEvents (Component)', () => {
  it('Has uniform dates in dd-mm-yyyy format.', async () => {
    const props = {
      eventList: [...eventListSample],
    };
    render(<UpcomingEvents {...props} />);

    const eventListItems = screen.getAllByRole('listitem');

    eventListItems.forEach((item) => {
      expect(
        within(item).getByRole('heading', {
          name: /^[0-9]*-[0-9]*-[0-9]*$/i,
        }),
      ).toBeInTheDocument();
    });
  });

  it("Informs user there are no events if there aren't any.", async () => {
    const props = {
      eventList: [],
    };
    render(<UpcomingEvents {...props} />);

    expect(
      screen.getByText('There are no upcoming events!'),
    ).toBeInTheDocument();
  });

  it('Does not render the list if there are no events.', async () => {
    const props = {
      eventList: [],
    };
    render(<UpcomingEvents {...props} />);

    expect(screen.queryByText('list')).not.toBeInTheDocument();
  });
});
