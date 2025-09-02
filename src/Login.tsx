import useAppState from './AppState';
import {useNavigate} from "react-router-dom";
import {Box, Button,Stack, TextField} from "@mui/material";
import {type FieldValues, useForm} from "react-hook-form";

const Login = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const navigate = useNavigate();

    const setIsAuthenticated = useAppState((state) => state.setIsAuthenticated);

    const login = () => {
        setIsAuthenticated(true)
        navigate("/ListCards")
    }
    const onSubmit = (data: FieldValues) => {
        login();
        reset();
        console.log(data);
    };

    return (
            <Box className="login" sx={{p: 2}}>
                <h1>Login</h1>
                <form data-testid="login-form" onSubmit={handleSubmit(data => onSubmit(data))}>
                    <Stack spacing={2}>

                        <TextField
                            {...register("username", {required: false})}
                            error={!!errors.username}
                            helperText={errors.username ? 'User Name is required' : ''}
                            sx={{backgroundColor: 'white', width: 225}}
                            label="Username"
                            variant="filled"
                        />

                        <TextField
                            {...register("password", {required: false})}
                            error={!!errors.password}
                            helperText={errors.password ? 'Password is required' : ''}
                            sx={{backgroundColor: 'white', width: 225}}
                            label="Password"
                            variant="filled"
                            type={"password"}
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
                            Submit
                        </Button>

                        <div className="login-message">
                            Click Submit to log in. No username or password is required.
                        </div>
                    </Stack>
                </form>
            </Box>
    )
}

export default Login;