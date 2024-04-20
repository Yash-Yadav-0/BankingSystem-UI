// AdminDashboardData.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Admin from '@mui/icons-material/ManageAccounts';
import Account from '@mui/icons-material/AccountBalance';
import KYC from '@mui/icons-material/DocumentScanner';
import Active from '@mui/icons-material/ToggleOn';
import DateIcon from '@mui/icons-material/CalendarMonth';
import Transactions from '@mui/icons-material/Paid';
import Savings from '@mui/icons-material/Savings';
import Withdraw from '@mui/icons-material/Payments';

const AdminDashboardData = () => {
    //get userType from local storage
    const userType = localStorage.getItem('userType');
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    //get the current date 
    const today = new Date();

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    //state to hold accounts
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const getAllAccounts = async () => {
            try {
                const response = await axios.get(`http://localhost:5224/api/accounts`, {
                    withCredentials: true,
                    headers: config.headers
                });
                if (response.status === 200) {
                    setAccounts(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getAllAccounts();
    }, []);


    //state to hold kyc
    const [kyc, setkyc] = useState([]);

    useEffect(() => {
        const getAllKyc = async () => {
            try {
                const response = await axios.get(`http://localhost:5224/api/kycdocument`, {
                    withCredentials: true,
                    headers: config.headers
                });
                if (response.status === 200) {
                    setkyc(response.data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        getAllKyc();
    }, []);

    const data = [
        {
            title: 'Position',
            value: userType,
            icon: <Admin sx={{ fontSize: 40 }} />
        },
        {
            title: 'Accounts',
            value: accounts.length,
            icon: <Account sx={{ fontSize: 40 }} />
        },
        {
            title: 'KYC',
            value: kyc.length,
            icon: <KYC sx={{ fontSize: 40 }} />
        },
        {
            title: 'Active',
            value: '5',
            icon: <Active sx={{ fontSize: 40 }} />
        },
        {
            title: 'Date',
            value: today.toDateString(),
            icon: <DateIcon sx={{ fontSize: 40 }} />
        },
        {
            title: 'Transactions',
            value: '10',
            icon: <Transactions sx={{ fontSize: 40 }} />
        },
        {
            title: 'Deposit',
            value: '10,000',
            icon: <Savings sx={{ fontSize: 40 }} />
        },
        {
            title: 'Withdraw',
            value: '20,000',
            icon: <Withdraw sx={{ fontSize: 40 }} />
        },
    ];

    return data;
};

export default AdminDashboardData;
