
import * as React from 'react';
import axios from 'axios';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

import CircularProgress from '@mui/material/CircularProgress';

import Swal from 'sweetalert2';

const VISIBLE_FIELDS = ['fullname', 'userName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'userType'];

export default function AdminViewUsers() {

    const [loading, setLoading] = React.useState(true);

    const [usersData, setUsersData] = React.useState({})

    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the JWT token
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    console.log("AdminViewUsers rendered");
    React.useEffect(() => {
        console.log("Fetching users...");
        const getUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5224/api/users', {
                    withCredentials: true, // Add withCredentials option
                    headers: config.headers // Send token in headers
                });
                if (response.status === 200) {
                    setUsersData(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        getUsers();
    }, []);


    const columns = [
        ...VISIBLE_FIELDS.map(field => ({
            field,
            headerName: field.charAt(0).toUpperCase() + field.slice(1), // Capitalize the first letter
            width: 150, // Set the width of the column
        })),
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleInfoClick(params.row)}>
                        <InfoIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditClick(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )
        }
    ];


    const handleInfoClick = (userData) => {
        Swal.fire({
            // icon: 'info',
            title: 'User Information',
            html: `
                <div style="text-align: left; font-size: 1rem;">
                    <br><strong>Name:</strong> ${userData.fullname} 
                    <br><br>
                    <strong>Date of Birth:</strong> ${userData.dateOfBirth}<br><br>
                    <strong>Email:</strong> ${userData.email}<br><br>
                    <strong>Id:</strong> ${userData.id}<br><br>
                    <strong>Phone:</strong> ${userData.phoneNumber}<br><br>
                    <strong>UserName:</strong> ${userData.userName}<br><br>
                    <strong>User Type:</strong> ${userData.userType}
                </div>
            `,
            confirmButtonText: 'Close',
        });
    };

    const handleEditClick = (userData) => {
        console.log('Edit clicked');
        console.log(userData);
        const dateOfBirth = new Date(userData.dateOfBirth).toISOString().split('T')[0];

        Swal.fire({
            title: "Update information",
            html: `
            <div style="text-align: left; font-size: 1rem; margin-left: 30px">
            <span style="display: inline-block; width: 100px;">UserName:</span> <input id="userName" class="swal2-input" value="${userData.userName}" ><br>
            <span style="display: inline-block; width: 100px;">Full Name:</span> <input id="fullname" class="swal2-input" value="${userData.fullname}"><br>
            <span style="display: inline-block; width: 100px;">Email:</span> <input id="email" class="swal2-input" value="${userData.email}"><br>
            <span style="display: inline-block; width: 100px;">Phone:</span> <input id="phoneNumber" class="swal2-input" value="${userData.phoneNumber}"><br>
            <span style="display: inline-block; width: 100px;">Address:</span> <input id="address" class="swal2-input" value="${userData.address}"><br>
            <span style="display: inline-block; width: 100px;">Date of Birth:</span> <input id="dateOfBirth" type="date" class="swal2-input" value="${dateOfBirth}"><br>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Submit",
            preConfirm: () => {
                return {
                    userName: document.getElementById("userName").value,
                    fullname: document.getElementById("fullname").value,
                    email: document.getElementById("email").value,
                    phoneNumber: document.getElementById("phoneNumber").value,
                    address: document.getElementById("address").value,
                    dateOfBirth: document.getElementById("dateOfBirth").value,
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const userId = userData.id;
                console.log(userId);
                const updatedData = {
                    userName: document.getElementById("userName").value,
                    fullname: document.getElementById("fullname").value,
                    email: document.getElementById("email").value,
                    phoneNumber: document.getElementById("phoneNumber").value,
                    address: document.getElementById("address").value,
                    // dateOfBirth: document.getElementById("dateOfBirth").value,
                    dateOfBirth: "2024-03-31T10:28:54.088Z",
                };

                // Make a PUT request to your API endpoint
                axios.put(`http://localhost:5224/api/users/${userId}`, updatedData)
                    .then(response => {
                        console.log(`Updated user with ID ${userId}`);
                        // Optionally, you can reload the page or perform other actions after updating
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);
                    });

                Swal.fire(`Profile updated successfully`, '', 'success');
            }
        });
    };
    const handleDeleteClick = (userData) => {
        const fullName = userData.fullname;
        const names = fullName.split(' ');
        const firstName = names[0];
        Swal.fire({
            // position: "top-end",
            title: "Confirm delete " + firstName + "'s profile?",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                const userId = userData.id;
                console.log(userId);
                axios.delete(`http://localhost:5224/api/users/${userId}`)
                    .then(response => {
                        console.log(`Deleted post with ID ${userId}`);
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error deleting post:', error);
                    });

                Swal.fire(firstName + "'s profile deleted!", '', 'success');
            }
        });
    }


    return (
        <div style={{ height: 550, width: '100%' }}>
            {loading ? (
                <CircularProgress /> // Show loader while data is being fetched
            ) : (
                <DataGrid
                    rows={usersData}
                    columns={columns}
                    pageSize={10}
                    components={{
                        Toolbar: GridToolbar, // Use GridToolbar as the toolbar component
                    }}
                    initialState={{
                        ...columns.initialState,
                        filter: {
                            ...columns.initialState?.filter,
                            filterModel: {
                                items: [
                                    {
                                        field: 'userType',
                                        operator: 'equals',
                                        value: 'accountHolder',
                                    },
                                ],
                            },
                        },
                    }}
                />)}
        </div>
    );
}