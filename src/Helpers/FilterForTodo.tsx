import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MyAccordion from './MyAccordion';
import {Radio, TextField} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {type FieldValues, useForm} from "react-hook-form";

//import dayjs from 'dayjs';

import type {FilterByForTodoPropsType, TodoFilterForm} from "../Types/DataTypes.ts";
import MyDatePicker from "./MyDatePicker.tsx";

const FilterForTodo = (props: FilterByForTodoPropsType) => {

    const {formState: {errors}, control, clearErrors} = useForm<FieldValues,TodoFilterForm>({mode: 'onChange'});

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MyAccordion id={"filter-todo"}
                         title={"Filter Todo's"}
                         style={{
                             width: 200,
                             bgHeaderColor: '#888',
                             bgBodyColor: '#aaa'
                         }}>
                <FormControl component="fieldset" sx={{width: 175, backgroundColor: '#aaa', padding: 0}}>
                    <FormLabel id="fields-for-filter"
                               sx={{
                                   fontSize: '10pt',
                                   backgroundColor: '#aaa',
                                   width: 75,
                                   padding: 0,
                                   borderRadius: 1,
                                   marginTop: 0
                               }}
                    >
                        <b>Filter By</b>
                    </FormLabel>
                    <div className={"filter-message"}>
                        <p>Description and Position can take a regular expresssion to filter on.</p>
                    </div>
                    <div className={"filter-container"}>
                        <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            sx={{fontSize: '10pt'}}
                            value={props.filterByDescription}
                            onChange={e => props.setFilterByDescription(e.target.value)}
                        />
                        <TextField
                            id="position"
                            label="Position"
                            variant="outlined"
                            size="small"
                            sx={{fontSize: '10pt'}}
                            value={props.filterByPosition}
                            onChange={e => props.setFilterByPosition(e.target.value)}
                        />
                        <RadioGroup
                            sx={{backgroundColor: '#aaa',
                                 padding: "10px",
                                 gap:"0px",
                                 border: "1px solid #888",
                                 borderRadius: 1,
                                 marginTop: 0}}
                            aria-labelledby="radio-buttons-group-for-filter"
                            name="filter-by-completed"
                            value={props.filterByCompleted}
                            onChange={e => props.setFilterByCompleted(e.target.value)}
                        >
                            <b>Status</b>
                            <FormControlLabel value="all" control={<Radio size="small"/>} label="All"/>
                            <FormControlLabel value="completed" control={<Radio size="small"/>} label="Completed"/>
                            <FormControlLabel value="pending" control={<Radio size="small"/>} label="Pending"/>
                        </RadioGroup>
                        <b>Due Date Range</b>
                        <MyDatePicker
                            name={"dueDateRangeStart"}
                            label={"Due Date Start"}
                            value={props.filterByDueDateRangeStart}
                            filterByDate={props.filterByDueDateRangeEnd} // Pass end date for comparison
                            setFilterByDate={props.setFilterByDueDateRangeStart}
                            control={control}
                            errors={errors}
                            sx={{backgroundColor: '#ccc', width: 225}}
                            rules={
                                {
                                    validate: value => {
                                        clearErrors();
                                        const end = props.filterByDueDateRangeEnd;
                                        if (value && end) {
                                            const endDate = end.toDate();
                                            const startDate = value.toDate();
                                            return startDate <= endDate || 'Start date must be before end date';
                                        }
                                        return true
                                    }
                                }
                            }
                        >
                        </MyDatePicker>
                        <MyDatePicker
                            name={"dueDateRangeEnd"}
                            label={"Due Date End"}
                            value={props.filterByDueDateRangeEnd}
                            filterByDate={props.filterByDueDateRangeStart} // Pass start date for comparison
                            setFilterByDate={props.setFilterByDueDateRangeEnd}
                            control={control}
                            errors={errors}
                            sx={{backgroundColor: '#ccc', width: 225}}
                            rules={
                                {
                                    validate: value => {
                                        clearErrors()
                                        const start = props.filterByDueDateRangeStart;
                                        if (value && start) {
                                            const startDate = start.toDate();
                                            const endDate = value.toDate();
                                            return endDate >= startDate || 'End date must be after Start date';
                                        }
                                        return true
                                    }
                                }
                            }
                        >
                        </MyDatePicker>
                    </div>
                </FormControl>
            </MyAccordion>
        </LocalizationProvider>
    )
}

export default FilterForTodo
