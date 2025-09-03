import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {type FieldValues, useForm} from "react-hook-form";
import Box from '@mui/material/Box';

import InpTextField from './InputHelpers/InpTextField.tsx';
import InpRadioGroup from './InputHelpers/InpRadioGroup.tsx';
import InpDatePicker from './InputHelpers/InpDatePicker.tsx';

import type {FilterByForTodoPropsType, TodoFilterForm} from "../Types/DataTypes.ts";

const FilterForTodo = (props: FilterByForTodoPropsType & {
    expanded: boolean,
    onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void
}) => {

    const {formState: {errors}, control, clearErrors} = useForm<FieldValues, TodoFilterForm>({mode: 'onChange'});

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{width: '100%'}}>
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
                        <b>Filter Todo's</b>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor: '#aaa', px: 2, py: 1}}>
                        <FormControl component="fieldset" sx={{width: '100%', backgroundColor: '#aaa', padding: 0}}>
                            <FormLabel id="fields-for-filter"
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
                                <b>Filter By</b>
                            </FormLabel>
                            <div className={"filter-message"} style={{textAlign: 'left', width: '100%'}}>
                                <p>Description and Position can take a regular expresssion to filter on.</p>
                            </div>
                            <div className={"filter-container"} style={{width: '100%'}}>
                                <InpTextField
                                    id="description"
                                    label="Description"
                                    value={props.filterByDescription}
                                    onChange={props.setFilterByDescription}
                                    sx={{width: '100%'}}
                                />
                                <InpTextField
                                    id="position"
                                    label="Position"
                                    value={props.filterByPosition}
                                    onChange={props.setFilterByPosition}
                                    sx={{width: '100%'}}
                                />
                                <InpRadioGroup
                                    title={"Status"}
                                    value={props.filterByCompleted}
                                    onChange={props.setFilterByCompleted}
                                    options={[
                                        {value: 'all', label: 'All'},
                                        {value: 'completed', label: 'Completed'},
                                        {value: 'pending', label: 'Pending'}
                                    ]}
                                    name="filter-by-completed"
                                    ariaLabelledBy="radio-buttons-group-for-filter"
                                    sx={{width: '100%'}}
                                />
                                <b>Due Date Range</b>
                                <InpDatePicker
                                    name={"dueDateRangeStart"}
                                    label={"Due Date Start"}
                                    value={props.filterByDueDateRangeStart}
                                    filterByDate={props.filterByDueDateRangeEnd}
                                    setFilterByDate={props.setFilterByDueDateRangeStart}
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        validate: value => {
                                            clearErrors();
                                            const end = props.filterByDueDateRangeEnd;
                                            if (value && end) {
                                                const endDate = end.toDate();
                                                const startDate = value.toDate();
                                                return startDate <= endDate || 'Start date must be before end date';
                                            }
                                            return true;
                                        }
                                    }}
                                    sx={{width: '100%'}}
                                />
                                <InpDatePicker
                                    name={"dueDateRangeEnd"}
                                    label={"Due Date End"}
                                    value={props.filterByDueDateRangeEnd}
                                    filterByDate={props.filterByDueDateRangeStart}
                                    setFilterByDate={props.setFilterByDueDateRangeEnd}
                                    control={control}
                                    errors={errors}
                                    rules={{
                                        validate: value => {
                                            clearErrors();
                                            const start = props.filterByDueDateRangeStart;
                                            if (value && start) {
                                                const startDate = start.toDate();
                                                const endDate = value.toDate();
                                                return endDate >= startDate || 'End date must be after Start date';
                                            }
                                            return true;
                                        }
                                    }}
                                    sx={{width: '100%'}}
                                />
                            </div>
                        </FormControl>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </LocalizationProvider>
    )
}

export default FilterForTodo
