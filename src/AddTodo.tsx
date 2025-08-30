import React, {useState} from 'react';
import {useForm, Controller, type FieldValues} from "react-hook-form";
import {TextField, Button, Box, Stack, Snackbar, Alert, type TextFieldProps} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

//import dayjs, { Dayjs } from 'dayjs';

import useAppState from "./AppState.ts";
import {isAfter, parseISO} from "date-fns";

const AddTodo = () => {

    const {register, handleSubmit, reset, formState: {errors}, control} = useForm();

    const addTodo = useAppState((state) => state.addTodo);

    const [open, setOpen] = useState(false);

    const rec = {
        recno: 0,
        description: "Buy groceries",
        position: "Greeter",
        completed: false,
        dueDate: "2024-06-10"
    }

    const onSubmit = (data: FieldValues) => {
        rec.description = data.description.trim();
        rec.position = data.position.trim();
        rec.dueDate = data.dueDate ? data.dueDate.format('YYYY-MM-DD') : '';
        addTodo(rec);
        setOpen(true);
        reset();
        console.log(
            `Added ${rec.description} to the list`
        )
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    const goodDate = (value: Date) => {
        //const date1 = parseISO(value);
        const date2 = parseISO("2025-08-15");
        return isAfter(value, date2);
    }

    // Style override to target anchor class
    const mySnackbarStyles = {
        '&.MuiSnackbar-root': {
            top: '250px',
            zIndex: 1400
        },
        '&.MuiSnackbar-anchorOriginTopRight': {
            top: '250px',
            zIndex: 1400
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="add-todo" sx={{p: 2}}>
                <h2>Add Todo</h2>
                <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <Stack spacing={2}>

                        <TextField
                            {...register("description", {required: true})}
                            error={!!errors.description}
                            helperText={errors.description ? 'Description is required' : ''}
                            sx={{backgroundColor: 'white', width: 225}}
                            label="New Todo"
                            variant="filled"
                        />

                        <TextField
                            {...register("position", {required: true})}
                            error={!!errors.position}
                            helperText={errors.position ? 'Position is required' : ''}
                            sx={{backgroundColor: 'white', width: 225}}
                            label="Position"
                            variant="filled"
                        />

                        <Controller
                            name={"dueDate"}
                            defaultValue={null}
                            control={control}
                            rules={{
                                required: 'Due Date is required.',
                                validate: value => goodDate(value) || 'Due Date must be after 08-15-25'
                            }}
                            render={({field: {onChange, value}}) => (
                                <DatePicker
                                    label="Due Date"
                                    value={value}
                                    onChange={onChange}
                                    slotProps={{
                                        textField: {
                                            variant: 'filled',
                                            error: !!errors.dueDate,
                                            helperText: errors.dueDate ? errors.dueDate.message : '',
                                            sx: {backgroundColor: 'white', width: 225}
                                        } as Partial<TextFieldProps>
                                    }}
                                />
                            )}
                        />
                        <Button
                            sx={{
                                width: 100,
                                '&.Mui-disabled': {
                                    backgroundColor: '#e0e0e0',
                                    color: '#888888'
                                }
                            }}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add
                        </Button>
                    </Stack>
                </form>
                <Snackbar open={open}
                          autoHideDuration={3000}
                          onClose={handleClose}
                          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                          sx={{...mySnackbarStyles}}>
                    <Alert onClose={handleClose}
                           severity="success"> Todo added successfully!
                    </Alert>
                </Snackbar>
            </Box>
        </LocalizationProvider>
    );
};

export default AddTodo;
