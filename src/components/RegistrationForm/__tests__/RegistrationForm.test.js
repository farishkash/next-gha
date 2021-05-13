import { render, screen } from '@testing-library/react';
import RegistrationForm from '../index';

describe('RegistrationForm (Component)', () => {
  it('Renders the form elements on mount', () => {
    render(<RegistrationForm />);

    expect(
      screen.getByRole('button', { name: 'Register' }),
    ).toBeInTheDocument();
  });
});
