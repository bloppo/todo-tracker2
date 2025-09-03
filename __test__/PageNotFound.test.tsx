import {render, screen} from '@testing-library/react';
import PageNotFound from '../src/PageNotFound';
import React from 'react';

describe('PageNotFound', () => {
    it('renders 404 heading and message', () => {
        render(<PageNotFound/>);
        expect(screen.getByRole('heading', {name: /404/i})).toBeInTheDocument();
        expect(screen.getByText(/the page you are looking for does not exist/i)).toBeInTheDocument();
    });

    it('has the correct class name', () => {
        render(<PageNotFound/>);
        expect(screen.getByText(/404/i).parentElement).toHaveClass('page-not-found');
    });
});

