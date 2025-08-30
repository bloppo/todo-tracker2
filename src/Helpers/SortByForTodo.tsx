import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Checkbox} from "@mui/material";
import MyAccordion from "./MyAccordion.tsx";


interface SortByForTodoProps {
    sortBy: string;
    setSortBy: (value: string) => void;
    sortAsc: boolean;
    setSortAsc: (value: boolean) => void;
}

const SortByForTodo = ({sortBy, setSortBy, sortAsc, setSortAsc}: SortByForTodoProps) => {

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
                <RadioGroup
                    sx={{backgroundColor: '#aaa', padding: 0, borderRadius: 1, marginTop: 0}}
                    aria-labelledby="radio-buttons-group-for-sort"
                    name="sortby"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <FormControlLabel
                        sx={{
                            "& .MuiFormControlLabel-label": {fontSize: '10pt'}
                        }}
                        value="description" control={<Radio/>} label="Description"/>
                    <FormControlLabel
                        sx={{
                            "& .MuiFormControlLabel-label": {fontSize: '10pt'}
                        }}
                        value="position" control={<Radio/>} label="Position"/>
                    <FormControlLabel
                        sx={{
                            "& .MuiFormControlLabel-label": {fontSize: '10pt'}
                        }}
                        value="completed" control={<Radio/>} label="Completed"/>
                    <FormControlLabel
                        sx={{
                            "& .MuiFormControlLabel-label": {fontSize: '10pt'}
                        }}
                        value="duedate" control={<Radio/>} label="Due Date"/>
                </RadioGroup>
                <FormControlLabel
                    sx={{mt: 0, fontSize: '6pt'}}
                    control={
                        <Checkbox
                            checked={sortAsc}
                            onChange={e => setSortAsc(e.target.checked)}
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