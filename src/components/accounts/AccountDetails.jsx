import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./FormDialog";
import IconButton from '@mui/material/IconButton';

export default function AccountDetails() {
    const [accountDetails, setAccountDetails] = useState([]);
    const [accountToEdit, setAccountToEdit] = React.useState(null);

    //get token from local storage
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userType === 'AccountHolder') {
            fetchAccountDetails();
        }
    }, [userType]);

    const fetchAccountDetails = async () => {
        try {
            const responseData = await fetch("http://localhost:5224/api/accounts/by" + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            if (!responseData.ok) {
                throw new Error("Failed to fetch account details");
            }
            const response = await responseData.json();
            console.log("Response data:", response);

            setAccountDetails(response); // Update this line
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <h2><b>Account Details</b></h2>
            <div className="container">
                {accountDetails ? (
                    <div>
                        <p><b>Account Number:</b> {accountDetails.accountNumber}</p>
                        <p><b>Balance:</b> {accountDetails.balance}</p>
                        <p><b>ATM Number:</b> {accountDetails.atmCardNum} </p>
                        <p><b>ATM Pin:</b> {accountDetails.atmCardPin}
                            <IconButton aria-label="edit" size="small"
                                onClick={() => {
                                    setAccountToEdit(accountDetails);
                                    handleClickOpen();
                                }}>
                                <EditIcon />
                            </IconButton>
                        </p>
                        <p><b>Created At:</b>{accountDetails.createdAt}</p>
                        <p><b>Created At:</b>{accountDetails.modifiedAt}</p>



                    </div>
                ) : (
                    <p>No account details found</p>
                )}
            </div>
        </div>
    );
}
