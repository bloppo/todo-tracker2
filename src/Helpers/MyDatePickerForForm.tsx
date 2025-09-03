import {
    Controller,
    type FieldValues,
    type Control,
    type RegisterOptions,
    type FieldErrors
} from "react-hook-form";

import type {TextFieldProps} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import {type SxProps, type Theme} from '@mui/material';


interface DatePickerPropsType {
    name: string;
    label: string;
    value: Date | null;
    control: Control<FieldValues, never>;
    rules: RegisterOptions;
    errors: FieldErrors<never>;
    sx: SxProps<Theme>;
}

const MyDatePickerForForm = (props: DatePickerPropsType) => {

    return (
        <Controller
            name={props.name}
            defaultValue={null}
            // @ts-expect-error Type mismatch
            control={props.control}
            rules={props.rules}
            render={({field: {onChange, value}}) => (
                <DatePicker
                    label={props.label}
                    value={value}
                    onChange={onChange}
                    slotProps={{
                        textField: {
                            variant: 'filled',
                            error: !!props.errors[props.name],
                            // @ts-expect-error Type Mismatch
                            helperText: props.errors[props.name] ? props.errors[props.name].message : '',
                            sx: props.sx
                        } as Partial<TextFieldProps>
                    }}
                />
            )}
        />
    )

}

export default MyDatePickerForForm;
