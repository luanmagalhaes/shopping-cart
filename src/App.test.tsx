import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardContent from './pages/Home/components/CardContent';
import Home from './pages/Home/index';

describe('App Test', () => {
    test('it should show the Add to cart button', () => {
        render(<CardContent />);

        const addToCartButton = screen.getByRole('button', {
            name: /Adicionar/i,
        });
        expect(addToCartButton).toBeInTheDocument();
    });

    test('it should add + 1 into Typography component', async () => {
        render(
            <>
                <Home />
                <CardContent />
            </>,
        );

        async function fireClick() {
            const addToCartButton = screen.getAllByRole('button', {
                name: /Adicionar/i,
            })[0];

            await fireEvent.click(addToCartButton);

            const typography = await screen.findByText('1');

            expect(typography.textContent).toBe('1');
        }

        fireClick();
    });
});
