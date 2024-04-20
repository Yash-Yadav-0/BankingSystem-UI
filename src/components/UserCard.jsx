import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import VerifiedIcon from '@mui/icons-material/Verified';

import LocationIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2';

import axios from 'axios';


//  const [expanded, setExpanded] = React.useState(false);

// const handleInfoClick = () => {
//     Swal.fire({
//         // icon: 'info',
//         title: 'User Information',
//         html: `
//             <div style="text-align: left; font-size: 1rem;">
//                 <br><strong>Name:</strong> ${userData.fullname} 
//                 <br><br>
//                 <strong>Date of Birth:</strong> ${userData.dateOfBirth}<br><br>
//                 <strong>Email:</strong> ${userData.email}<br><br>
//                 <strong>Id:</strong> ${userData.id}<br><br>
//                 <strong>Phone:</strong> ${userData.phoneNumber}<br><br>
//                 <strong>UserName:</strong> ${userData.userName}<br><br>
//                 <strong>User Type:</strong> ${userData.userType}
//             </div>
//         `,
//         confirmButtonText: 'Close',
//     });
// };

// const handleEditClick = () => {
//     console.log('Edit clicked');
//     console.log(userData);
//     const dateOfBirth = new Date(userData.dateOfBirth).toISOString().split('T')[0];

//     Swal.fire({
//         title: "Update information",
//         html: `
//         <div style="text-align: left; font-size: 1rem; margin-left: 30px">
//         <span style="display: inline-block; width: 100px;">UserName:</span> <input id="userName" class="swal2-input" value="${userData.userName}" ><br>
//         <span style="display: inline-block; width: 100px;">Full Name:</span> <input id="fullname" class="swal2-input" value="${userData.fullname}"><br>
//         <span style="display: inline-block; width: 100px;">Email:</span> <input id="email" class="swal2-input" value="${userData.email}"><br>
//         <span style="display: inline-block; width: 100px;">Phone:</span> <input id="phoneNumber" class="swal2-input" value="${userData.phoneNumber}"><br>
//         <span style="display: inline-block; width: 100px;">Address:</span> <input id="address" class="swal2-input" value="${userData.address}"><br>
//         <span style="display: inline-block; width: 100px;">Date of Birth:</span> <input id="dateOfBirth" type="date" class="swal2-input" value="${dateOfBirth}"><br>
//         </div>
//         `,
//         showCancelButton: true,
//         confirmButtonText: "Submit",
//         preConfirm: () => {
//             return {
//                 userName: document.getElementById("userName").value,
//                 fullname: document.getElementById("fullname").value,
//                 email: document.getElementById("email").value,
//                 phoneNumber: document.getElementById("phoneNumber").value,
//                 address: document.getElementById("address").value,
//                 dateOfBirth: document.getElementById("dateOfBirth").value,
//             };
//         },
//     }).then((result) => {
//         if (result.isConfirmed) {
//             const userId = userData.id;
//             console.log(userId);
//             const updatedData = {
//                 userName: document.getElementById("userName").value,
//                 fullname: document.getElementById("fullname").value,
//                 email: document.getElementById("email").value,
//                 phoneNumber: document.getElementById("phoneNumber").value,
//                 address: document.getElementById("address").value,
//                 // dateOfBirth: document.getElementById("dateOfBirth").value,
//                 dateOfBirth: "2024-03-31T10:28:54.088Z",
//             };

//             // Make a PUT request to your API endpoint
//             axios.put(`http://localhost:5224/api/users/${userId}`, updatedData)
//                 .then(response => {
//                     console.log(`Updated user with ID ${userId}`);
//                     // Optionally, you can reload the page or perform other actions after updating
//                     window.location.reload();
//                 })
//                 .catch(error => {
//                     console.error('Error updating user:', error);
//                 });

//             Swal.fire(`Profile updated successfully`, '', 'success');
//         }
//     });
// };
// const handleDeleteClick = () => {
//     const fullName = userData.fullname;
//     const names = fullName.split(' ');
//     const firstName = names[0];
//     Swal.fire({
//         // position: "top-end",
//         title: "Confirm delete " + firstName + "'s profile?",
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'Yes'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             const userId = userData.id;
//             console.log(userId);
//             axios.delete(`http://localhost:5224/api/users/${userId}`)
//                 .then(response => {
//                     console.log(`Deleted post with ID ${userId}`);
//                     window.location.reload();
//                 })
//                 .catch(error => {
//                     console.error('Error deleting post:', error);
//                 });

//             Swal.fire(firstName + "'s profile deleted!", '', 'success');
//         }
//     });
// }

export default function UserCard({ userData }) {
    return (
        <Card sx={{ height: 500, width: 350, margin: 3, padding: 2, }}>
            {/* <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <VerifiedIcon />
                    </IconButton>
                }
            /> */}
            <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                {
                    <Avatar sx={{ bgcolor: red[500], width: 250, height: 250 }} style={{ marginBottom: '2rem', }}>
                        {userData.img ? (
                            <img src={userData.img} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            userData.name.charAt(0).toUpperCase()
                        )}
                    </Avatar>
                }
                <div style={{ textAlign: 'left' }}>

                    <Typography variant="h6" color="text.secondary" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                        {userData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: '10px' }}>
                        {userData.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: '10px' }}>
                        {userData.bio}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        <LocationIcon sx={{ marginRight: '0', verticalAlign: 'middle' }} /> {userData.address}
                    </Typography> */}
                </div>

            </CardContent>
            {/* <CardActions disableSpacing style={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={handleInfoClick}>
                    <InfoIcon />
                </IconButton>
                <IconButton onClick={handleEditClick}>
                    <ModeEditIcon />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon />
                </IconButton>
            </CardActions> */}

        </Card>
    );
}