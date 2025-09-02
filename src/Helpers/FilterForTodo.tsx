import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MyAccordion from './MyAccordion';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {type FieldValues, useForm} from "react-hook-form";

import InpTextField from './InputHelpers/InpTextField.tsx';
import InpRadioGroup from './InputHelpers/InpRadioGroup.tsx';
import InpDatePicker from './InputHelpers/InpDatePicker.tsx';

import type {FilterByForTodoPropsType, TodoFilterForm} from "../Types/DataTypes.ts";

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
                        <InpTextField
                            id="description"
                            label="Description"
                            value={props.filterByDescription}
                            onChange={props.setFilterByDescription}
                        />
                        <InpTextField
                            id="position"
                            label="Position"
                            value={props.filterByPosition}
                            onChange={props.setFilterByPosition}
                        />
                        <InpRadioGroup
                            title={"Status"}
                            value={props.filterByCompleted}
                            onChange={props.setFilterByCompleted}
                            options={[
                                { value: 'all', label: 'All' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'pending', label: 'Pending' }
                            ]}
                            name="filter-by-completed"
                            ariaLabelledBy="radio-buttons-group-for-filter"
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
                        />
                    </div>
                </FormControl>
            </MyAccordion>
        </LocalizationProvider>
    )
}

export default FilterForTodo
