import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomAlert from '../../components/customComponent/CustomAlert';
import { Box ,LinearProgress} from '@mui/material';
import '../../styles/macros/kycUpdate.css'

const UpdateKycPage = () => {
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const [formData, setformData] = useState({
      KycId: '',
      UserId: '',
      FatherName: '',
      MotherName: '',
      GrandFatherName: '',
      PermanentAddress: '',
      UserImageFile: null,
      CitizenshipImageFile: null
  });

  const getToken=()=>{
    const storedToken = localStorage.getItem('token'); // Replace with secure storage if needed
    if (!storedToken) {
      // Handle missing token (e.g., redirect to login)
      console.error('Missing token. User needs to log in.');
      return null;
    }
    return storedToken;
    };
    const config={
        headers: {
            'Authorization': `Bearer ${getToken()}`, // Use retrieved token
        }
    }

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`http://localhost:5224/api/kycdocument/${userId}`,{
                  withCredentials: true, // Add withCredentials option
                  headers: config.headers // Send token in headers
              });
              console.log('KYC data:', response.data);

              if (response.status === 200) {
                  setKycData(response.data);
                  setformData({ 
                      KycId: response.data.kycId,
                      UserId: response.data.userId,
                      FatherName: response.data.fatherName,
                      MotherName: response.data.motherName,
                      GrandFatherName: response.data.grandFatherName,
                      PermanentAddress: response.data.permanentAddress,
                      UserImageFile: null, // Since you can't set file input values programmatically for security reasons
                      CitizenshipImageFile: null // Same as above
                  });
              } else if (response.status === 404) {
                  setKycData(null);
                  console.log('KYC data not found');
              }

              setLoading(false);
          } catch (error) {
              console.error('Error fetching KYC data:', error);
              setError(error);
              setLoading(false);
          }
      };

      fetchData();

      return () => {
          // Cleanup function if needed
      };
  }, []);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setformData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
      const { name, files } = e.target;
      setformData({ ...formData, [name]: files[0] });
  };

  const showAlert = (message) => {
      setAlertMessage(message);
      setIsAlertVisible(true);
  };
  const closeAlert = () => {
      setIsAlertVisible(false);
  };

  const handleUpdate = async () => {
      try {
          const formDataToSend = new FormData();
          let hasChanged=false;
          for (const key in formData) {
              if (formData[key] !== null && formData[key] !== undefined) {
                  formDataToSend.append(key, formData[key]);
                  if(formData[key]!==kycData[key]){
                    hasChanged=true;
                  }
              }
          }
          if(!hasChanged){
            showAlert('No changes made to the KYC data.');
            return;
          }

          const params = new URLSearchParams();
          params.append('KycId', formData.KycId);

          const response = await axios.put('http://localhost:5224/api/kycdocument', formDataToSend, {
              params: params,
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log('KYC document updated successfully:', response.data);
          showAlert('KYC document updated successfully');
          // Optionally, you can reset the form here
          // setformData({ ... }); // Reset form fields to initial state
      } catch (error) {
          console.error('Error updating KYC document:', error);
          showAlert('Error updating KYC document. Please try again later.');
      }
  };

  if (loading) {
    return <Box sx={{ width: '100%',height:'5px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
    <LinearProgress />
    </Box>;
  }

  if (error || !kycData) {
      return <p>Error fetching KYC data. Please try again later.</p>;
  }

  return (
      <div className='kycUpdatePage' style={{marginTop:'5px'}}>
          <h3>Update KYC Information</h3>
          <div>
              <label>KycId:</label>
              <input type="text" name="KycId" value={formData.KycId} onChange={handleChange} disabled/>
              <label>UserId:</label>
              <input type="text" name="UserId" value={formData.UserId} onChange={handleChange} disabled />
          </div>
          <div>
              <label>Father Name:</label>
              <input type="text" name="FatherName" value={formData.FatherName} onChange={handleChange} />
          </div>
          <div>
              <label>Mother Name:</label>
              <input type="text" name="MotherName" value={formData.MotherName} onChange={handleChange} />
          </div>
          <div>
              <label>Grandfather Name:</label>
              <input type="text" name="GrandFatherName" value={formData.GrandFatherName} onChange={handleChange} />
          </div>
          <div>
              <label>Permanent Address:</label>
              <input type="text" name="PermanentAddress" value={formData.PermanentAddress} onChange={handleChange} />
          </div>
          <div>
              <label>User Image:</label>
              <input type="file" name="UserImageFile" onChange={handleFileChange} />
          </div>
          <div>
              <label>Citizenship Image:</label>
              <input type="file" name="CitizenshipImageFile" onChange={handleFileChange} />
          </div>
          <Button onClick={handleUpdate} className='update-btn'>Update KYC</Button>
          {isAlertVisible && <CustomAlert message={alertMessage} onClose={closeAlert} />}
      </div>
  );
};

export default UpdateKycPage;