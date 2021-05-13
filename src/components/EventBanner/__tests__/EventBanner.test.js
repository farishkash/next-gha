import { render, screen } from '@testing-library/react';
import EventBanner from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('EventBanner (Component)', () => {
  it('renders without crashing', () => {
    const props = {
      name: 'Sample Event Title',
      date: '05-05-21',
      featuredImage: { url: '/images/featured-1.jpg' },
    };
    render(<EventBanner {...props} />);
    expect(
      screen.getByRole('heading', { name: 'Sample Event Title' }),
    ).toBeInTheDocument();
  });
});
