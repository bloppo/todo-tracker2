import React from 'react';
import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {render, fireEvent} from '@testing-library/react';
import MyAccordion from '../src/Helpers/MyAccordion';

const props = {
    id: 'accordion1',
    title: 'Test Accordion',
    style: {
        width: '300px',
        bgHeaderColor: '#eee',
        bgBodyColor: '#fff'
    },
    children: <div>Accordion Content</div>
};

describe('MyAccordion', () => {
    it('renders title and children', () => {
        const {getByText} = render(<MyAccordion {...props} />);
        expect(getByText('Test Accordion')).toBeInTheDocument();
        expect(getByText('Accordion Content')).toBeInTheDocument();
    });

    it('toggles accordion body on icon click', () => {
        const {container} = render(<MyAccordion {...props} />);
        const icon = container.querySelector('.MuiSvgIcon-root');
        const body = container.querySelector('.myaccordion-body');
        expect(body).toHaveClass('myaccordion-hide');
        fireEvent.click(icon!);
        expect(body).toHaveClass('myaccordion-show');
        fireEvent.click(icon!);
        expect(body).toHaveClass('myaccordion-hide');
    });
});

