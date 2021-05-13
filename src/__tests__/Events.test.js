import { render, screen } from '@testing-library/react';
import Events from '../pages/events';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('Events', () => {
  it('renders without crashing', () => {
    render(<Events />);
    expect(
      screen.getByRole('heading', { name: 'There are no upcoming events!' }),
    ).toBeInTheDocument();
  });
});
