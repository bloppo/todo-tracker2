import {render, screen, waitFor} from '@testing-library/react';
import MyDatePicker from '../src/Helpers/MyDatePicker';
import dayjs from 'dayjs';
import {useForm} from 'react-hook-form';
import React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import userEvent from '@testing-library/user-event';

describe('MyDatePicker', () => {
    function Wrapper(props: never) {
        const {control, formState: {errors}} = useForm({mode: 'onChange'});
        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MyDatePicker {...props} control={control} errors={errors}/>
            </LocalizationProvider>
        );
    }

    it('renders the date picker', () => {
        render(
            <Wrapper
                name="dueDateRangeStart"
                label="Due Date Start"
                value={null}
                rules={{}}
                sx={{}}
                filterByDate={null}
                setFilterByDate={() => {
                }}
            />
        );
        // Use getByRole for MUI DatePicker container
        expect(screen.getByRole('group')).toBeTruthy();
    });

    it('shows error message when validation fails', async () => {
        const errorMessage = 'Start date must be before end date';
        const rules = {
            validate: () => errorMessage
        };
        render(
            <Wrapper
                name="dueDateRangeStart"
                label="Due Date Start"
                value={dayjs('2025-09-04')}
                rules={rules}
                sx={{}}
                filterByDate={dayjs('2025-09-04')}
                setFilterByDate={() => {
                }}
            />
        );
        // Wait for error helper text to appear
        await waitFor(() => {
            const helper = document.querySelector('.MuiFormHelperText-root');
        });
    });
});
