import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import UserProfile from './UserProfile'
import UserUpdateProfile from './UserUpdateProfile'
import UserUpdateCredentials from './UserUpdateCredentials'

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {/* typography component must be set to div as by default it will take p and under p other divs will be rendered that will show warning of mismatch hierarchy as p cant be parent of div*/}
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserParent() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="My Profile" {...a11yProps(0)} />
                    <Tab label="Edit Profile" {...a11yProps(1)} />
                    <Tab label="Edit Credentials" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <UserProfile />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <UserUpdateProfile />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <UserUpdateCredentials />
            </CustomTabPanel>
        </Box>
    );
}
