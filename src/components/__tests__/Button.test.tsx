import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';
import * as Haptics from 'expo-haptics';

jest.mock('expo-haptics');

describe('Button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPress} />);
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('triggers haptic feedback on press', () => {
    const { getByText } = render(<Button title="Test Button" onPress={() => {}} />);
    fireEvent.press(getByText('Test Button'));
    expect(Haptics.impactAsync).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPress} disabled />);
    fireEvent.press(getByText('Test Button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows loading indicator when loading', () => {
    const { queryByText } = render(<Button title="Test Button" onPress={() => {}} loading />);
    expect(queryByText('Test Button')).toBeNull();
  });

  it('has correct accessibility props', () => {
    const { getByRole } = render(
      <Button title="Test Button" onPress={() => {}} accessibilityLabel="Custom Label" accessibilityHint="Custom Hint" />
    );
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Custom Label');
    expect(button.props.accessibilityHint).toBe('Custom Hint');
  });
});
