import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders activity indicator', () => {
    const { getByLabelText } = render(<LoadingSpinner />);
    expect(getByLabelText('Loading')).toBeTruthy();
  });

  it('renders message when provided', () => {
    const { getByText } = render(<LoadingSpinner message="Loading routes..." />);
    expect(getByText('Loading routes...')).toBeTruthy();
  });

  it('does not render message when not provided', () => {
    const { queryByText } = render(<LoadingSpinner />);
    expect(queryByText(/Loading/)).toBeNull();
  });
});
