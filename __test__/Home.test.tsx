import {render, screen} from '@testing-library/react';
import Home from '../src/Home';

describe('Home Component', () => {
    it('renders the home div with correct class and test id', () => {
        render(<Home/>);
        const homeDiv = screen.getByTestId('home-div');
        expect(homeDiv).toBeInTheDocument();
        expect(homeDiv).toHaveClass('home');
    });

    it('renders empty content by default', () => {
        render(<Home/>);
        const homeDiv = screen.getByTestId('home-div');
        expect(homeDiv.textContent).toBe('');
    });
});
