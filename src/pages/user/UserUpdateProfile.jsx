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

export default function UserUpdateProfile() {

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

    const [userProfile, setUserProfile] = React.useState({})

    React.useEffect(() => {
        console.log("Fetching data...");
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5224/api/users/${userId}`, {
                    withCredentials: true, // Add withCredentials option
                    headers: config.headers // Send token in headers
                });
                if (response.status === 200) {
                    console.log(response.data);
                    setUserProfile(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getUserProfile();
    }, []);


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
        setUserProfile((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateUser = async (data) => {
        try {
            console.log('credentials:', data);
            console.log(data);
            // return
            const response = await fetch(`http://localhost:5224/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: data.userName, FullName: data.fullname, Email: data.email, Address: data.address, PhoneNumber: data.phoneNumber, DateOfBirth: "2024-03-30T13:40:13.001Z",

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

        const { userName, fullname, email, phoneNumber, address, dateOfBirth } = userProfile;

        // console.log(userProfile);

        const response = await updateUser({ userName, fullname, email, phoneNumber, address, dateOfBirth });

        if (response) {
            console.log('User Profile Updated:', response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Profile Updated",
                showConfirmButton: false,
                timer: 2000
            });
            // alert(`Full Name: ${fullName}, Email: ${email}, User Name: ${userName}, Password: ${password}, Address: ${address}, Phone: ${phone}, User Type: ${userType}, Date of Birth: ${dateOfBirth}`);
        } else {
            console.log('Update failed');
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Update Failed",
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
                        Update Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="fullname"
                                    placeholder="Full Name"
                                    name="fullname"
                                    value={userProfile.fullname}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={userProfile.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    fullWidth
                                    id="userName"
                                    placeholder="User Name"
                                    name="userName"
                                    value={userProfile.userName}
                                    onChange={handleChange}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    placeholder="Address"
                                    id="address"
                                    value={userProfile.address}
                                    onChange={handleChange}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    id="phoneNumber"
                                    value={userProfile.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input type="hidden" id='userType' name='userType' value={0} />
                                {/* <input type="hidden" id='modifiedBy' name='modifiedBy' value={`${userId}`} />
                                <input type="hidden" id='modifiedAt' name='modifiedAt' value={Date.now()} /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Date of Birth"
                                        name="dateOfBirth"

                                    // onChange={(newValue) => {
                                    //     setFormData((prevFormData) => ({
                                    //         ...prevFormData,
                                    //         dateOfBirth: "2024-03-30T13:40:13.001Z",
                                    //     }));
                                    // }}
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
                            Update
                        </Button>

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
