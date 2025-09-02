import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Checkbox} from "@mui/material";
import MyAccordion from "./MyAccordion.tsx";
import type {SortByForTodoPropsType} from "../Types/DataTypes.ts";
import InpRadioGroup from "./InputHelpers/InpRadioGroup.tsx";

const SortByForTodo = (props: SortByForTodoPropsType) => {

    return (
        <MyAccordion
            id={"sort-todo"}
            title={"Sort Todo's"}
            style={{
                width: 200,
                bgHeaderColor: '#888',
                bgBodyColor: '#aaa'
            }}
        >
            <FormControl component="fieldset" sx={{width: 175, backgroundColor: '#aaa', padding: 0}}>
                <FormLabel id="radio-buttons-group-for-sort"
                           sx={{
                               fontSize: '10pt',
                               backgroundColor: '#aaa',
                               width: 75,
                               padding: 0,
                               borderRadius: 1,
                               marginTop: 0
                           }}
                >
                    <b>Sort By</b>
                </FormLabel>
                <InpRadioGroup
                    value={props.sortBy}
                    onChange={props.setSortBy}
                    options={[
                        { value: 'description', label: 'Description' },
                        { value: 'position', label: 'Position' },
                        { value: 'completed', label: 'Completed' },
                        { value: 'duedate', label: 'Due Date' }
                    ]}
                    name="sortby"
                    ariaLabelledBy="radio-buttons-group-for-sort"
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
        </MyAccordion>
    )
}

export default SortByForTodo;