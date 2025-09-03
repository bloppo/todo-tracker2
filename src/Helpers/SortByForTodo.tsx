import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Checkbox} from "@mui/material";
import type {SortByForTodoPropsType} from "../Types/DataTypes.ts";
import InpRadioGroup from "./InputHelpers/InpRadioGroup.tsx";

const SortByForTodo = (props: SortByForTodoPropsType & {
    expanded: boolean,
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
}) => {
    return (
        <Accordion
            expanded={props.expanded}
            onChange={props.onChange}
            sx={{
                maxWidth: 200,
                width: '100%',
                margin: '0 auto',
                backgroundColor: '#aaa',
                p: 0,
                m: 0,
                boxShadow: 'none'
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                sx={{backgroundColor: '#888', px: 2, alignItems: 'center'}}
            >
                <b>Sort Todo's</b>
            </AccordionSummary>
            <AccordionDetails sx={{backgroundColor: '#aaa', px: 2, py: 1}}>
                <FormControl component="fieldset" sx={{width: '100%', backgroundColor: '#aaa', padding: 0}}>
                    <FormLabel id="radio-buttons-group-for-sort"
                               sx={{
                                   fontSize: '10pt',
                                   backgroundColor: '#aaa',
                                   width: '100%',
                                   padding: 0,
                                   borderRadius: 1,
                                   marginTop: 0,
                                   textAlign: 'left'
                               }}
                    >
                        <b>Sort By</b>
                    </FormLabel>
                    <InpRadioGroup
                        value={props.sortBy}
                        onChange={props.setSortBy}
                        options={[
                            {value: 'description', label: 'Description'},
                            {value: 'position', label: 'Position'},
                            {value: 'completed', label: 'Completed'},
                            {value: 'duedate', label: 'Due Date'}
                        ]}
                        name="sortby"
                        ariaLabelledBy="radio-buttons-group-for-sort"
                        sx={{width: '100%'}}
                    />
                    <FormControlLabel
                        sx={{mt: 0, fontSize: '6pt'}}
                        control={
                            <Checkbox
                                checked={props.sortAsc}
                                onChange={e => props.setSortAsc(e.target.checked)}
                                slotProps={{
                                    input: {'aria-label': 'Sort ascending'}
                                }}
                                sx={{
                                    "& .MuiFormControlLabel-label": {fontSize: '10pt'}
                                }}
                            />
                        }
                        label="Ascending"
                    />
                </FormControl>
            </AccordionDetails>
        </Accordion>
    )
}

export default SortByForTodo;