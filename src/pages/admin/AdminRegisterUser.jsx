import * as React from 'react';
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

export default function AdminRegisterUser() {

    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        userName: '',
        password: '',
        address: '',
        phone: '',
        userType: '',
        dateOfBirth: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const registerUser = async (data) => {
        try {
            console.log('credentials:', data);
            const response = await fetch('http://localhost:5224/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: data.userName, Fullname: data.fullName, Email: data.email, Password: data.password, Address: data.address, PhoneNumber: data.phone, UserType: data.userType,
                    DateOfBirth: "2024-03-30T13:40:13.001Z",

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

        const { fullName, email, userName, password, address, phone, userType, dateOfBirth } = formData;

        const response = await registerUser({ userName, fullName, email, password, phone, address, userType, dateOfBirth });

        if (response) {
            console.log('User registered successfully:', response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Registered Successfully",
                showConfirmButton: false,
                timer: 2000
            });
            // alert(`Full Name: ${fullName}, Email: ${email}, User Name: ${userName}, Password: ${password}, Address: ${address}, Phone: ${phone}, User Type: ${userType}, Date of Birth: ${dateOfBirth}`);
            setFormData({
                fullName: '',
                email: '',
                userName: '',
                password: '',
                address: '',
                phone: '',
                userType: '',
                dateOfBirth: null,
            });
        } else {
            console.log('User registration failed');
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "User Registration Failed",
                showConfirmButton: false,
                timer: 2000
            });
            setFormData({
                fullName: '',
                email: '',
                userName: '',
                password: '',
                address: '',
                phone: '',
                userType: '',
                dateOfBirth: null,
            });
        }


    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <HowToRegOutlinedIcon />
                    </Avatar>
                    {/* <Typography component="h1" variant="h5"> */}
                    <Typography component="span">
                        Registration Form
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                    value={formData.fullName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    label="User Name"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="userType-label">User Type</InputLabel>
                                    <Select
                                        labelId="userType-label"
                                        id="userType"
                                        name="userType"
                                        label="User Type"
                                        value={formData.userType}
                                        onChange={handleChange}

                                    >
                                        <MenuItem value={1}>Teller</MenuItem>
                                        <MenuItem value={0}>Account Holder</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date of Birth"
                                        name="dateOfBirth"

                                        value={formData.dateOfBirth}
                                        onChange={(newValue) => {
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                dateOfBirth: newValue,
                                            }));
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
