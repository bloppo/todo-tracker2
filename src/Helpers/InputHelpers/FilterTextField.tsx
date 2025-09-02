import { TextField } from '@mui/material';

interface FilterTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: object;
}

const FilterTextField = ({ id, label, value, onChange, sx }: FilterTextFieldProps) => (
  <TextField
    id={id}
    label={label}
    variant="outlined"
    size="small"
    sx={{ fontSize: '10pt', ...sx }}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);

export default FilterTextField;

