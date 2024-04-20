import React, { useState, useEffect } from 'react';
import DepositMoneyForm from '../components/DepositMoneyForm';
import WithdrawMoneyForm from '../components/WithdrawMoneyForm';
import TransactionTable from '../components/TransactionTable';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@mui/icons-material/Search';
export default function Transaction() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [searchAccountNumber, setSearchAccountNumber] = useState('');
    //get token from local storage
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        // Fetch transactions from the backend API when the component mounts if user is AccountHolder
        if (userType === 'AccountHolder') {
            fetchTransactions();
        }
    }, [userType]); // Fetch transactions when userType changes
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const accountResponse = await fetch("http://localhost:5224/api/accounts/by" + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            if (!accountResponse.ok) {
                throw new Error("Failed to fetch accounts");
            }
            const accountData = await accountResponse.json();
            console.log("Response data:", accountData); // Log the response data for debugging
            if (!accountData || !accountData.accountNumber) { // Check if data or data.accounts is missing or empty
                throw new Error("Invalid accounts data");
            }
            setAccountNumber(accountData.accountNumber);
            const response = await fetch("http://localhost:5224/api/transactions/" + accountData.accountNumber, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await response.json();
            console.log("Response data:", data); // Log the response data for debugging
            if (!data || !data.length) { // Check if data or data.transactions is missing or empty
                throw new Error("Invalid response format: Missing transactions data");
            }
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
        setLoading(false);
    };
    // Function to handle search by account number for TellerPerson
    const handleSearch = async () => {
        try {
            setLoading(true);
            // Fetch transactions directly using the searchAccountNumber
            const response = await fetch(`http://localhost:5224/api/transactions/${searchAccountNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }
            const data = await response.json();
            if (!data || !data.length) {
                throw new Error("Invalid response format: Missing transactions data");
            }
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
        setLoading(false);
    };
    // JSX to render search input for teller person
    const renderSearchInput = () => {
        return (
            <div className="form-buttons">
                <TextField label="Enter Account Number" variant="outlined" type="text"
                    id="searchAccountNumber"
                    placeholder="Enter Account Number"
                    value={searchAccountNumber}
                    onChange={(e) => setSearchAccountNumber(e.target.value)}
                    style={{ width: '30rem', height: '5rem' }} />
                <button className="deposit-button"  style={{ marginLeft: '1rem', marginTop: '0.5rem' }} onClick={handleSearch}>
                Search
                </button>
            </div>
        );
    };
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);
    const handleDepositClick = () => {
        setShowDepositForm(true);
        setShowWithdrawForm(false); // Hide withdrawal form if it's open
    };
    const handleWithdrawClick = () => {
        setShowWithdrawForm(true);
        setShowDepositForm(false); // Hide deposit form if it's open
    };
    const handleWithdrawSuccess = () => {
        fetchTransactions(); // Update transactions after a successful withdraw
    };
    return (
        <div className="transaction-container">
            <h1>Transaction Page</h1>
            <div className="form-container">
                {/* Render search input for teller person */}
                {userType === 'TellerPerson' && renderSearchInput()}
                {transactions && transactions.length > 0 ? (
                    <TransactionTable transactions={transactions} />
                ) : (
                    <p>No transactions found</p>
                )}
                {userType === 'TellerPerson' && (
                    <div className="form-buttons">
                        <button className="deposit-button" onClick={handleDepositClick}>Deposit Money</button>
                    </div>
                )}
                {userType !== 'TellerPerson' && (
                    <div className="form-buttons">
                        <button className="deposit-button" onClick={handleWithdrawClick}>Withdraw Money</button>
                    </div>
                )}
                {showDepositForm && <DepositMoneyForm />}
                {showWithdrawForm && <WithdrawMoneyForm onWithdrawSuccess={handleWithdrawSuccess} />}
            </div>
        </div>
    );
}