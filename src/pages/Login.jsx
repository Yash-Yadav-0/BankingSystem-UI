
//import LoginForm from "../components/loginForm";


// export default function Login() {
//     return (
//         <div>
//            
//             <center>
//                 <h2>Login Form</h2>
//             </center>
//             <LoginForm />
//         </div>
//     )
// }


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';


import Navbar from "../components/Navbar.jsx";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {

  const [userInput, setUserInput] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const loginUser = async (credentials) => {
    try {
      //console.log('credentials:', credentials);
      const response = await fetch("http://localhost:5224/api/users/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ UserName: credentials.username, Password: credentials.password }),
        credentials: 'include'
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = userInput;

    const response = await loginUser({ username, password });

    if (response) {
      // console.log(response);
      //to show success message using SweetAlert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 2000
      });
      //store the necessary data in local storage
      localStorage.setItem('userId', response.id);
      localStorage.setItem('email', response.email);
      localStorage.setItem('userName', response.userName);
      localStorage.setItem('userType', response.userType);
      localStorage.setItem('token', response.token);

      const sessionID = response.sessionID;

      // Store the session ID in a secure cookie
      document.cookie = `SessionID=${sessionID}; Secure; SameSite=Strict; Path=/`;

      if (response.userType === "TellerPerson")
        window.location.href = "/adminhomepage";
      else if (response.userType === "AccountHolder")
        window.location.href = "/userhomepage";
      else
        window.location.href = "/aaa";
    } else {
      //reset the input fields
      setUserInput({
        username: "",
        password: "",
      });

      //error message using SweetAlert
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Invalid username or password",
        showConfirmButton: false,
        timer: 2000
      });
    }
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Grid container component="main" sx={{ height: '89.5vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={userInput.username}
                onChange={handleChange}
                sx={{ color: '#000000' }} // Set font color to black
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userInput.password}
                onChange={handleChange}
                sx={{ color: '#000000' }} // Set font color to black
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

