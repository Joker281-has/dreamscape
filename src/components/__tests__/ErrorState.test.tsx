import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  it('renders title and message', () => {
    const { getByText } = render(<ErrorState title="Error Title" message="Error message here" />);
    expect(getByText('Error Title')).toBeTruthy();
    expect(getByText('Error message here')).toBeTruthy();
  });

  it('renders action button when provided', () => {
    const onAction = jest.fn();
    const { getByText } = render(<ErrorState title="Error" message="Message" actionLabel="Retry" onAction={onAction} />);
    const button = getByText('Retry');
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('does not render button when action not provided', () => {
    const { queryByText } = render(<ErrorState title="Error" message="Message" />);
    expect(queryByText('Retry')).toBeNull();
  });
});
