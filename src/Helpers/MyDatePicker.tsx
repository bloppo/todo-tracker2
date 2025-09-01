import {Controller,
    type FieldValues,
    type Control,
    type RegisterOptions,
    type FieldErrors} from "react-hook-form";

import type {TextFieldProps} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import { type SxProps, type Theme } from '@mui/material';
import dayjs from "dayjs";
import type {TodoFilterForm} from "../Types/DataTypes.ts";

interface DatePickerPropsType {
    name:string;
    label:string;
    value:dayjs.Dayjs | null;
    rules:RegisterOptions['validate'];
    control:Control<FieldValues, TodoFilterForm>;
    errors: FieldErrors<FieldValues>;
    sx: SxProps<Theme>;
    filterByDate: dayjs.Dayjs | null;
    setFilterByDate: (value: dayjs.Dayjs | null) => void;
}

const MyDatePicker = (props:DatePickerPropsType) => {

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
                        error: !!props.errors[props.name],
                        //@ts-expect-error Type issue
                        helperText: props.errors[props.name] ? props.errors[props.name]['message'] : '',
                        sx: props.sx,
                        FormHelperTextProps: {
                            'data-testid': 'datepicker-helper-text'
                        }
                    } as Partial<TextFieldProps>
                }}
            />
        )}
    />
)   
    
}

export default MyDatePicker;
