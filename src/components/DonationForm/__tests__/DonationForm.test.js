import { render, screen } from '@testing-library/react';
import DonationForm from '../index';

const props = {
  formState: {
    name: '',
    email: '',
    amount: '',
  },
  success: null,
  error: null,
  processing: null,
};

describe('DonationForm (Component)', () => {
  it('Renders the form elements on mount', () => {
    const handleUpdateField = jest.fn();
    const handleFormSubmit = jest.fn();

    render(
      <DonationForm
        {...props}
        handleUpdateField={handleUpdateField}
        handleFormSubmit={handleFormSubmit}
        CardElement={() => <h2>Card element</h2>}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Make Donation' }),
    ).toBeInTheDocument();
  });
});
