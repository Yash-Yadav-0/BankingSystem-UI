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

import Navbar from '../components/Navbar.jsx'

import Swal from 'sweetalert2';

const defaultTheme = createTheme();

export default function ContactUs() {

    const [formData, setFormData] = React.useState({
        fullName: '',
        email: '',
        address: '',
        phone: '',
        formType: '',
        message: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitForm = async (data) => {
        try {
            console.log('credentials:', data);

            return { success: true, message: 'Fake response message' };
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

        const { fullName, email, address, phone, userType, message } = formData;

        const response = await submitForm({ fullName, email, address, phone, userType, message });

        if (response) {
            setFormData({
                fullName: '',
                email: '',
                address: '',
                phone: '',
                formType: '',
                message: '',
            });
            console.log('Form Sent successfully:', response);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Form Sent successfully",
                showConfirmButton: false,
                timer: 2000
            });
            // alert(`Full Name: ${fullName}, Email: ${email}, User Name: ${userName}, Password: ${password}, Address: ${address}, Phone: ${phone}, User Type: ${userType}, Date of Birth: ${dateOfBirth}`);

        } else {
            console.log('Failed to Send Form');
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Failed to Send Form",
                showConfirmButton: false,
                timer: 2000
            });
            setFormData({
                fullName: '',
                email: '',
                address: '',
                phone: '',
                formType: '',
                message: '',
            });
        }


    }

    return (
        <div>

            <Navbar />
            <div style={{ backgroundColor: 'lightgreen', height: '15rem', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <h2>Contact Us</h2>
                <br />
                <p>If you have any questions or need assistance, please feel free to contact us at any time. We are available 24/7 to assist you.</p>
            </div>
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
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <HowToRegOutlinedIcon />
                        </Avatar> */}
                        {/* <Typography component="h1" variant="h5"> */}
                        {/* <Typography component="span">
                            Registration Form
                        </Typography> */}
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

                                        onChange={handleChange}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Phone"
                                        id="phone"
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="formType-label">Form Type</InputLabel>
                                        <Select
                                            labelId="formType-label"
                                            id="formType"
                                            name="formType"
                                            label="Form Type"
                                            defaultValue=""
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="inquiry">General Inquiry</MenuItem>
                                            <MenuItem value="feedback">Feedback</MenuItem>
                                            <MenuItem value="complain">Complain</MenuItem>
                                            <MenuItem value="request">Support Request</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name="message"
                                        label="Message"
                                        id="message"
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Submit
                            </Button>

                        </Box>
                    </Box>

                </Container>
            </ThemeProvider>
        </div>
    );
}


