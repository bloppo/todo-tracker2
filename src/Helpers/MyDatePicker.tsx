import {
    Controller,
    type FieldValues,
    type Control,
    type RegisterOptions,
    type FieldErrors
} from "react-hook-form";

//import type {TextFieldProps} from "@mui/material";

import {DatePicker} from "@mui/x-date-pickers";
import {type SxProps, type Theme} from '@mui/material';
import dayjs from "dayjs";
import type {TodoFilterForm} from "../Types/DataTypes.ts";

interface DatePickerPropsType {
    name: string;
    label: string;
    value: dayjs.Dayjs | null;
    rules: RegisterOptions['validate'];
    control: Control<FieldValues, TodoFilterForm>;
    errors: FieldErrors<FieldValues>;
    sx: SxProps<Theme>;
    filterByDate: dayjs.Dayjs | null;
    setFilterByDate: (value: dayjs.Dayjs | null) => void;
}

const MyDatePicker = (props: DatePickerPropsType) => {
    // Custom error logic for invalid date range
    let customError = false;
    let customHelperText = '';
    if (props.name === 'dueDateRangeEnd' && props.value && props.filterByDate) {
        // End date must be after start date
        if (props.value.isBefore(props.filterByDate, 'day')) {
            customError = true;
            customHelperText = 'End date must be after start date';
        }
    }
    if (props.name === 'dueDateRangeStart' && props.value && props.filterByDate) {
        // Start date must be before end date
        if (props.value.isAfter(props.filterByDate, 'day')) {
            customError = true;
            customHelperText = 'Start date must be before end date';
        }
    }
    return (
        <Controller
            name={props.name}
            defaultValue={null}
            control={props.control}
            //@ts-expect-error Type missue
            rules={props.rules}
            render={({field: {onChange}}) => (
                <DatePicker
                    data-testid="my-datepicker"
                    label={props.label}
                    sx={props.sx}
                    value={props.value}
                    onChange={
                        date => {
                            onChange(date);
                            if (date) {
                                const isoDate = dayjs(date)
                                props.setFilterByDate(isoDate);
                            } else {
                                props.setFilterByDate(null);
                            }
                        }
                    }
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            error: customError || !!props.errors[props.name],
                            //@ts-expect-error Type issue
                            helperText: customError ? customHelperText : (props.errors[props.name] ? props.errors[props.name]['message'] : ''),
                            sx: props.sx,
                        }
                    }}
                />
            )}
        />
    )
}

export default MyDatePicker;
