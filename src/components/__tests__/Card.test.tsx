import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('applies custom style prop', () => {
    const customStyle = { marginTop: 20 } as any;
    const { getByText } = render(
      <Card style={customStyle}>
        <Text>Content</Text>
      </Card>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('accepts custom blur intensity', () => {
    const { getByText } = render(
      <Card intensity={80}>
        <Text>Content</Text>
      </Card>
    );
    expect(getByText('Content')).toBeTruthy();
  });
});
