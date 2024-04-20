import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CustomAlert from './customComponent/CustomAlert';

const KycForm = ({ userId }) => {
    const [formData, setFormData] = useState({
        UserId: localStorage.getItem('userId') || '', 
        FatherName: '',
        MotherName: '',
        GrandFatherName: '',
        PermanentAddress: '',
        UserImageFile: null,
        CitizenshipImageFile: null
    });

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({ ...formData, [name]: files[0] });
    };

    const showAlert = (message) => {
        setAlertMessage(message);
        setIsAlertVisible(true);
    };

    const closeAlert = () => {
        setIsAlertVisible(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const response = await axios.post('http://localhost:5224/api/kycdocument', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('KYC document added successfully:', response.data);
            setFormData({
                UserId: userId,
                FatherName: '',
                MotherName: '',
                GrandFatherName: '',
                PermanentAddress: '',
                UserImageFile: null,
                CitizenshipImageFile: null
            });
            showAlert("KYC document added successfully");
        } catch (error) {
            console.error('Error adding KYC document:', error);
            showAlert("Ahh, something went wrong. Please try again.");
        }
    };

    return (
        <div className='kycSubmitPage' style={{marginTop:'5px'}}>
            <form onSubmit={handleSubmit}>
                <div>
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
                <div style={{ display: 'flex', flexDirection:'column', margin:'10px', rowGap:'10px',
                                justifyContent: 'space-between',alignContent:'center',alignItems:'center'}}>
                    <label>User Image:</label>
                    <input type="file" className="fileinputbutton" name="UserImageFile" onChange={handleFileChange} />

                    <label>Citizenship Image:</label>
                    <input type="file" className="fileinputbutton" name="CitizenshipImageFile" onChange={handleFileChange} />
                </div>
                <Button type="submit" className='submit-btn' variant="contained" endIcon={<CloudUploadIcon />}>Submit KYC</Button>

                {isAlertVisible && <CustomAlert message={alertMessage} onClose={closeAlert} />}
            </form>
        </div>
    );
};

export default KycForm;
