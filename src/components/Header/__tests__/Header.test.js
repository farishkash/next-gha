import { render } from '@testing-library/react';
import Header from '../index';

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('Header (Component)', () => {
  it('Matches the snapshot', () => {
    const tree = render(<Header />);
    expect(tree).toMatchSnapshot();
  });
});
