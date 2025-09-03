import {render, screen} from '@testing-library/react';
import Header from '../src/Header';
import {format} from 'date-fns';

describe('Header Component', () => {
    it('renders the header title', () => {
        render(<Header/>);
        expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('To Do Tracker');
    });

    it('renders the GitHub link', () => {
        render(<Header/>);
        const link = screen.getByRole('link', {name: /github/i});
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://github.com/bloppo/todo-tracker2');
    });

    it('renders today\'s date in MM/dd/yy format', () => {
        render(<Header/>);
        const today = format(new Date(), 'MM/dd/yy');
        expect(screen.getByText(today)).toBeInTheDocument();
    });
});

