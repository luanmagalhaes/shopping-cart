import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CardContent from './pages/Home/components/CardContent';

describe('App Test', () => {
    test('it should show the Add to cart button', () => {
        render(<CardContent />);

        const addToCartButton = screen.getByRole('button', {
            name: /Adicionar/i,
        });
        expect(addToCartButton).toBeInTheDocument();
    });

    test('it should add + 1 into Typography component', () => {
        render(<CardContent />);

        const addToCartButton = screen.getByRole('button', {
            name: /Adicionar/i,
        });

        userEvent.click(addToCartButton);
        expect(screen.queryByText('1')).toBeNull();
    });
});
