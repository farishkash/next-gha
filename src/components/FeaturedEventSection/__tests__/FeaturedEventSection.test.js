import { render, screen } from '@testing-library/react';
import FeaturedEventSection from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('FeaturedEventSection (Component)', () => {
  it('Renders the featured event title even with no props', () => {
    render(<FeaturedEventSection />);
    expect(
      screen.getByRole('heading', { name: /Featured\sEvent/ }),
    ).toBeInTheDocument();
  });
});
