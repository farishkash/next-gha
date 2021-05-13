import { render, screen, cleanup } from '@testing-library/react';
import Title from '../index';

afterEach(cleanup);

describe('Title (Component)', () => {
  it('Renders the title correctly', () => {
    const props = {
      title: 'Sample Event Title',
    };
    render(<Title {...props} />);
    expect(
      screen.getByRole('heading', { name: 'Sample Event Title' }),
    ).toBeInTheDocument();
  });
});
