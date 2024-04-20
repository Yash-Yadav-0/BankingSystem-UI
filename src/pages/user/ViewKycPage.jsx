import { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem ,ListItemText,Divider,Box,LinearProgress} from '@mui/material';

const ViewKycPage = () => {
    const [kycData, setKycData] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem('userId');

    const getToken = () => {
        const storedToken = localStorage.getItem('token'); // Replace with secure storage if needed
        if (!storedToken) {
          // Handle missing token (e.g., redirect to login)
          console.error('Missing token. User needs to log in.');
          return null;
        }
        return storedToken;
        };

      const config = {
        headers: {
            'Authorization': `Bearer ${getToken()}`, // Use retrieved token
        },
      };
    
    useEffect(() => {
        console.log("fetching data......");
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5224/api/kycdocument/${userId}`,{
                    withCredentials: true, // Add withCredentials option
                    headers: config.headers // Send token in headers
                });
                console.log(response.data);
                
                if (response.status === 200) {
                    setKycData(response.data);
                } else if (response.status === 404) {
                    setKycData(null);
                    console.log('KYC data not found');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching KYC data',error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const style = {
        py: 0,
        width: '100%',
        maxWidth: 400,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor:'#1b1a1a31',
        padding:'20px',
        margin:'20px',
    };

    if (loading) {
        return <Box sx={{ width: '100%',height:'5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
        <LinearProgress />
        </Box>;
    }

    return (
        <List sx={style}>
            {/* Display the KYC data */
            /* Remaining User Image and Citizenship Image */}
            <ListItem>
                <ListItemText primary={`Father Name: ${kycData?.fatherName}`} />
            </ListItem>    
            <Divider variant="middle" component="li" />
            <ListItem>
                <ListItemText primary={`Mother Name: ${kycData?.motherName}`} />
            </ListItem> 
            <Divider variant="middle" component="li" />
            <ListItem>
                <ListItemText primary={`Grandfather Name: ${kycData?.grandFatherName}`} />
            </ListItem> 
            <Divider variant="middle" component="li" />
            <ListItem>
                <ListItemText primary={`Permanent Address: ${kycData?.permanentAddress}`} />
            </ListItem>
        </List>
    );
};

export default ViewKycPage;
