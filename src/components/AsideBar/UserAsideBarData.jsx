import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountBalance';
import KYCIcon from '@mui/icons-material/DocumentScanner';
import UserIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import TransactionIcon from '@mui/icons-material/MonetizationOn';

export const UserAsideBarData = [
    {
        title: "Dashboard",
        icon: <HomeIcon />,
    },
    {
        title: "Accounts",
        icon: <AccountIcon />,
    },
    {
        title: "KycPage",
        icon: <KYCIcon />,
    },
    {
        title: "Transactions",
        icon: <TransactionIcon/>
    },
    {
        title: "Profile",
        icon: <UserIcon />,
    },
    {
        title: "Logout",
        icon: <LogoutIcon />,
    },
]