import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

interface Option {
    value: string;
    label: string;
}

interface InpRadioGroupProps {
    title?: string
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    sx?: object;
    name?: string;
    ariaLabelledBy?: string;
}

const InpRadioGroup = ({title, value, onChange, options, sx, name, ariaLabelledBy}: InpRadioGroupProps) => (
    <RadioGroup
        sx={{
            backgroundColor: '#aaa',
            padding: '10px',
            gap: '0px',
            border: '1px solid #888',
            borderRadius: 1,
            marginTop: 0, ...sx
        }}
        aria-labelledby={ariaLabelledBy}
        name={name}
        value={value}
        onChange={e => onChange(e.target.value)}
    >
        <b>{title}</b>
        {options.map(opt => (
            <FormControlLabel key={opt.value} value={opt.value} control={<Radio size="small"/>} label={opt.label}/>
        ))}
    </RadioGroup>
);

export default InpRadioGroup;

