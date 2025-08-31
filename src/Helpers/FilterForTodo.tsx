import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MyAccordion from './MyAccordion';
import {Radio, TextField, type TextFieldProps} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {Controller, useForm} from "react-hook-form";

import dayjs from 'dayjs';

import type {FilterByForTodoPropsType} from "../Types/DataTypes.ts";

const FilterForTodo = (props: FilterByForTodoPropsType) => {

    const {formState: {errors}, control} = useForm({mode: 'onChange'});

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
                    <div style={{fontSize: "8pt", width: "100%", textAlign: "left"}}>
                        <p>Description and Position can take a regular expresssion to filter on.</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
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
                            sx={{backgroundColor: '#aaa', padding: 0, borderRadius: 1, marginTop: 0}}
                            aria-labelledby="radio-buttons-group-for-filter"
                            name="filter-by-completed"
                            value={props.filterByCompleted}
                            onChange={e => props.setFilterByCompleted(e.target.value)}
                        >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                                padding: "6px",
                                border: "1px solid black"
                            }}>
                                <b>Status</b>
                                <FormControlLabel value="all" control={<Radio size="small"/>} label="All"/>
                                <FormControlLabel value="completed" control={<Radio size="small"/>} label="Completed"/>
                                <FormControlLabel value="pending" control={<Radio size="small"/>} label="Pending"/>
                            </div>
                        </RadioGroup>
                        <b>Due Date Range</b>
                        <Controller
                            name={"dueDateRangeStart"}
                            defaultValue={null}
                            control={control}
                            rules={{
                                validate: value => {
                                    const end = control._formValues.dueDateRangeEnd
                                    if (value && end) {
                                        const startDate = value.toDate();
                                        const endDate = end.toDate();
                                        return endDate > startDate || 'Start date must be before end date';
                                    }
                                    return true
                                }
                            }}
                            render={({field: {onChange}}) => (
                                <DatePicker
                                    label="Due Date Start"
                                    value={props.filterByDueDateRangeStart}
                                    onChange={
                                        date => {
                                            onChange(date);
                                            if (date) {
                                                const isoString = dayjs(date)
                                                props.setFilterByDueDateRangeStart(isoString);
                                            } else {
                                                props.setFilterByDueDateRangeStart(null);
                                            }
                                        }
                                    }
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            error: !!errors.dueDateRangeStart,
                                            helperText: errors.dueDateRangeStart ? errors.dueDateRangeStart!.message : '',
                                            sx: {backgroundColor: '#ccc', width: 225}
                                        } as Partial<TextFieldProps>
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name={"dueDateRangeEnd"}
                            defaultValue={null}
                            control={control}
                            rules={{
                                validate: value => {
                                    const start = control._formValues.dueDateRangeStart
                                    if (value && start) {
                                        const startDate = start.toDate();
                                        const endDate = value.toDate();
                                        return endDate > startDate || 'End date must be after start date';
                                    }
                                    return true
                                }
                            }}
                            render={({field: {onChange}}) => (
                                <DatePicker
                                    label="Due Date End"
                                    value={props.filterByDueDateRangeEnd}
                                    onChange={
                                        date => {
                                            onChange(date);
                                            if (date) {
                                                const isoString = dayjs(date)//date.toISOString();
                                                props.setFilterByDueDateRangeEnd(isoString);
                                            } else {
                                                props.setFilterByDueDateRangeEnd(null);
                                            }
                                        }
                                    }

                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            error: !!errors.dueDateRangeEnd,
                                            helperText: errors.dueDateRangeEnd ? errors.dueDateRangeEnd.message : '',
                                            sx: {backgroundColor: '#ccc', width: 225}
                                        } as Partial<TextFieldProps>
                                    }}
                                />
                            )}
                        />
                    </div>
                </FormControl>
            </MyAccordion>
        </LocalizationProvider>
    )
}

export default FilterForTodo
