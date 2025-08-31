import {Controller,
    type FieldValues,
    type Control,
    type RegisterOptions,
    type FieldErrors} from "react-hook-form";

import type {TextFieldProps} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { type SxProps, type Theme } from '@mui/material';
import dayjs from "dayjs";
import type {PickerValue} from "@mui/x-date-pickers/internals";


interface DatePickerPropsType {
    name:string;
    label:string;
    value:Date | null;
    control:Control<FieldValues,never>;
    rules:RegisterOptions;
    errors: FieldErrors<never>;
    sx: SxProps<Theme>;
    filterByDate: dayjs.Dayjs | null;
    setFilterByDate: (value: dayjs.Dayjs | null) => void;
}

type PickerDate = Date | null

const MyDatePicker = (props:DatePickerPropsType) => {

    const handleDateChange = (
        date: PickerValue,
        onChange: (date: PickerDate) => void,
        setFilterByDate: (date: dayjs.Dayjs) => void
    ) => {
        onChange(date!.toDate());
        if (date) {
            const isoString : dayjs.Dayjs = dayjs(date.toDate());
            setFilterByDate(isoString);
        } else {
            //@ts-expect-error Type mismatch
            setFilterByDate(null);
        }
    }

    return (
        <Controller
            name={props.name}
            defaultValue={null}
            // @ts-expect-error Type mismatch
            control={props.control}
            rules={{
                validate: value => {
                    const end = props.control._formValues.dueDateRangeEnd
                    if (value && end) {
                        const startDate = value.toDate();
                        const endDate = end.toDate();
                        return endDate > startDate || 'Start date must be before end date';
                    }
                    return true
                }
            }}
            render={({field: {onChange}}) => (
                <DatePicker
                    label="Due Date Start"
                    value={props.filterByDate}
                    onChange={date => handleDateChange( date,
                                                        onChange,
                                                        props.setFilterByDate)
                    }
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            error: !!props.errors[props.name],
                            helperText: props.errors[props.name] ? props.errors[props.name]['message']: '',
                            sx: {backgroundColor: '#ccc', width: 225}
                        } as Partial<TextFieldProps>
                    }}
                />
            )}
        />
    )
}

export default MyDatePicker;
