import React, {useState} from 'react';
import {useForm, type FieldValues} from "react-hook-form";
import {TextField, Button, Box, Stack, Dialog, Alert} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';

import {Dayjs} from 'dayjs';

import MyDatePickerForForm from './Helpers/MyDatePickerForForm.tsx';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

import useAppState from "./AppState.ts";

const AddTodo = () => {

    const {register, handleSubmit, formState: {errors},reset, control} = useForm();

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

    // Auto-close Dialog after 3 seconds
    React.useEffect(() => {
        if (open) {
            const timer = setTimeout(() => setOpen(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [open]);

    // Robust goodDate using Dayjs
    const goodDate = (value: Dayjs | null) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to start of today
        if (value !== null) {
            const selectedDate = value.toDate();
            selectedDate.setHours(0, 0, 0, 0); // Set to start of selected date
            return selectedDate > today; // Accept dates on today or after
        }
        return false;
    }

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

                        <MyDatePickerForForm
                            name={"dueDate"}
                            label="Due Date"
                            value={null}
                            control={control}
                            rules={{
                                required: 'Due Date is required.',
                                validate: value => goodDate(value) || 'Due Date must be before or on today'
                            }}
                            //@ts-expect-error Type issue
                            errors={errors}
                            sx={{backgroundColor: 'white', width: 225}}
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
                <Dialog open={open}
                            hideBackdrop
                            disableScrollLock
                            slotProps = {{
                                paper: {
                                    sx: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        p: 0,
                                        minWidth: 0,
                                        maxWidth: 'none',
                                        background: 'none',
                                    }
                                }
                        }}
                        sx={{
                            '& .MuiDialog-paper': {
                                position: 'fixed',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                m: 0,
                            }
                        }}
                >
                    <Alert severity="success"
                           sx={{fontSize: '1rem',
                                px: 3,
                                py: 2,
                               backgroundColor: 'lightgrey',
                               border: '2px solid green',
                               boxShadow: 3,
                               borderRadius: 2,
                               }}
                           > Todo added successfully!
                    </Alert>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
};

export default AddTodo;
