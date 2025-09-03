import MyDatePicker from '../MyDatePicker.tsx';
import type dayjs from 'dayjs';
import type {Control, FieldErrors, RegisterOptions, FieldValues} from 'react-hook-form';
import type {SxProps, Theme} from '@mui/material';
import type {TodoFilterForm} from '../../Types/DataTypes.ts';

interface InpDatePickerProps {
    name: string;
    label: string;
    value: dayjs.Dayjs | null;
    filterByDate: dayjs.Dayjs | null;
    setFilterByDate: (date: dayjs.Dayjs | null) => void;
    control: Control<FieldValues, TodoFilterForm>;
    errors: FieldErrors<FieldValues>;
    sx?: SxProps<Theme>;
    rules?: RegisterOptions['validate'];
}

const InpDatePicker = (props: InpDatePickerProps) => (
    <MyDatePicker
        name={props.name}
        label={props.label}
        value={props.value}
        filterByDate={props.filterByDate}
        setFilterByDate={props.setFilterByDate}
        control={props.control}
        errors={props.errors}
        sx={{backgroundColor: '#ccc', width: 225, ...props.sx}}
        rules={props.rules}
    />
);

export default InpDatePicker;
