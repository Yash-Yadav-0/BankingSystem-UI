import React from 'react';
import { useState } from 'react';
import KycForm from '../../components/kycform'; // Import the KycForm component
import ViewKycPage from './ViewKycPage';
import UpdateKycPage from './UpdateKycPage';

const UserKycPage = () => {
    const [activeTab, setActiveTab] = useState('viewKyc');
    return (
        <div>
            <h1>KYC Document Submission Page</h1>

            <div>
                <button onClick={() => setActiveTab('viewKyc')}>View Your Kyc</button>
                <button onClick={() => setActiveTab('postKyc')}>Upload KYC</button>
                <button onClick={() => setActiveTab('updateKyc')}>Update/Edit KYC</button>
            </div>
            <div style={{margin:'10px'}}>
                {activeTab === 'viewKyc' && <ViewKycPage/>}
                {activeTab === 'postKyc' && <KycForm/>}
                {activeTab==='updateKyc' && <UpdateKycPage/>}
            </div>
        </div>
    );
};

export default UserKycPage;
