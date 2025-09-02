import { TextField } from '@mui/material';

interface InpTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: object;
}

const InpTextField = ({ id, label, value, onChange, sx }: InpTextFieldProps) => (
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

export default InpTextField;

