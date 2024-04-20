import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import VerifiedIcon from '@mui/icons-material/Verified';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function UserProfile() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [userProfile, setUserProfile] = React.useState({})

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

    console.log("View Profile rendered");
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
    }, []); // Empty dependency array ensures that the effect runs only once

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
            <Card sx={{ width: 350, margin: 3, }}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <VerifiedIcon />
                        </IconButton>
                    }
                />
                <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    {
                        <Avatar sx={{ bgcolor: red[500], width: 70, height: 70 }} style={{ marginBottom: '15px', marginTop: '-20px' }}>
                            {userProfile && userProfile.fullname ? (
                                <Avatar sx={{ bgcolor: red[500] }}>
                                    {userProfile.image ? (
                                        <img src={userProfile.image} alt="User Avatar" />
                                    ) : (
                                        userProfile.fullname.charAt(0).toUpperCase()
                                    )}
                                </Avatar>
                            ) : null}
                        </Avatar>
                    }
                </CardContent>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: '10px' }}>
                        Full Name: {userProfile.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: '10px' }}>
                        Email: {userProfile.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: '10px' }}>
                        Phone: {userProfile.phoneNumber}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Address: {userProfile.address}
                    </Typography>


                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">UserName: {userProfile.userName} <br /><br />  Date of Birth: {userProfile.dateOfBirth}</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div >
    );
}