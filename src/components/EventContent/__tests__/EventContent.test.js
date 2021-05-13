import { render, screen } from '@testing-library/react';
import EventContent from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('EventContent (Component)', () => {
  it('renders without crashing', () => {
    const props = {
      speakers: ['test speaker'],
      where: 'Test location',
      content: 'Test event content',
    };
    render(<EventContent {...props} />);
    expect(
      screen.getByRole('heading', { name: 'Speakers' }),
    ).toBeInTheDocument();
    // screen.debug();
  });
});
