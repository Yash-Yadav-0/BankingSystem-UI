import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import FormControl from '@mui/material/FormControl'
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function ForgotPassword() {

    //Retrieve userId from local storage
    const userId = localStorage.getItem('userId');

    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the JWT token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const [formData, setFormData] = React.useState({
        username: '',
        newPassword: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateUserCredential = async (data) => {
        try {
            console.log('credentials:', data);
            console.log(data);

            const response = await fetch(`http://localhost:5224/resetPassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: data.username, password: data.newPassword
                })
            });

            if (response.status === 200) {
                return await response.json();
            }
            else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { username, newPassword } = formData;

        console.log('username:', username);
        console.log('newPassword:', newPassword);

        const response = await updateUserCredential({ username, newPassword });

        if (response) {
            console.log('User Credentials Updated:', response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Credentials Reset Successfully",
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            console.log('Update failed');
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Reset Failed",
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/*   <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Forgot Password?
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="UserName"
                            name="username"
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newPassword"
                            label="New Password"
                            type="password"
                            id="newPassword"
                            onChange={handleChange}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
