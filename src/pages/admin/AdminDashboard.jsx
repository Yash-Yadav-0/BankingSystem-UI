// AdminDashboard.jsx

import React from 'react';
import { Grid, Paper, Typography, ListItemIcon } from '@mui/material';
import AdminDashboardData from './AdminDashboardData';

const AdminDashboard = () => {
    const data = AdminDashboardData();

    return (
        <div>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid key={index} item xs={3}>
                        <Paper sx={{ padding: 2 }} style={{ display: 'flex', alignItems: 'center', }}>
                            <div>
                                <ListItemIcon sx={{ minWidth: 0, mr: 2, display: 'flex', alignItems: 'center' }}>
                                    {item.icon}
                                </ListItemIcon>
                            </div>
                            <div >
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography>{item.value}</Typography>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default AdminDashboard;
