import { render, screen } from '@testing-library/react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Donate from '../pages/donate';

const stripePromise = loadStripe(
  'pk_test_51IGVGVGjzZBtdwJusNWLBh3BFpGasBmPeZOYDwO85WcuL7HmMSq5zsw1LfcR0ZTWN2DuKfigvnAnAeYvHNLRaUrp00OQMu5ZUj',
);

beforeEach(() => {
  jest.spyOn(console, 'error');
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockImplementation(() => null);
});

afterEach(() => {
  // @ts-ignore jest.spyOn adds this functionallity
  console.error.mockRestore();
});

describe('Donate', () => {
  it('renders without crashing', () => {
    render(
      <Elements stripe={stripePromise}>
        <Donate />
      </Elements>,
    );
    expect(
      screen.getByRole('heading', { name: 'Donate to Meet/Hang/Code' }),
    ).toBeInTheDocument();
  });
});
