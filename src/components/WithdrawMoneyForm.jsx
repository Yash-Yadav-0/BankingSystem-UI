import React, { useState } from 'react';
import axios from 'axios';

const WithdrawMoneyForm = ({ onWithdrawSuccess }) => {
  const [amount, setAmount] = useState(0);
  const [transactionRemarks, setTransactionRemarks] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [atmCardPin, setAtmCardPin] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setTransactionRemarks(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAtmCardPinChange = (e) => {
    setAtmCardPin(e.target.value);
  };

  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('token');

  // Set the Authorization header with the JWT token
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5224/api/transactions/withdraw?accountNumber='+accountNumber+'&atmCardPin='+atmCardPin, {
        amount,
        transactionRemarks
      }, {
        withCredentials: true, // Add withCredentials option
        headers: config.headers // Send token in headers
      });
      console.log('Withdrawal successful:', response.data);
      // Optionally, you can handle success here (e.g., show a success message)
      onWithdrawSuccess();
    } catch (error) {
      console.error('Withdrawal failed:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
    } finally {
      setLoading(false);
      // Reset form fields after submission
      setAmount(0);
      setTransactionRemarks('');
      setAccountNumber('');
      setAtmCardPin('');
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Money</h2>
      <form onSubmit={handleSubmit} className="withdraw-form">
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="remarks">Transaction Remarks:</label>
          <input
            type="text"
            id="remarks"
            value={transactionRemarks}
            onChange={handleRemarksChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number:</label>
          <input
            type="text"
            id="accountNumber"
            value={accountNumber}
            onChange={handleAccountNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="atmCardPin">ATM Card PIN:</label>
          <input
            type="password"
            id="atmCardPin"
            value={atmCardPin}
            onChange={handleAtmCardPinChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Withdraw'}
        </button>
      </form>
    </div>
  );
};

export default WithdrawMoneyForm;