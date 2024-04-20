import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const FormDialog = ({ open, onClose, onOpen, account, accountNumber }) => {
  const [atmCardPin, setAtmPin] = React.useState("");
  const [accountNumberState, setAccountNumber] = React.useState(accountNumber || "");

  const handleChange = (event) => {
    setAtmPin(event.target.value);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target.value);
  };

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5224/api/accounts?accountNumber=${accountNumber}`,
        {
          atmCardPin,
        }, {
        withCredentials: true, // Add withCredentials option
        headers: config.headers // Send token in headers
      });
      console.log("Pin reset successful:", response.data);
    } catch (error) {
      console.error("Pin reset failed:", error);
    } finally {
      setAtmPin("");
      setAccountNumber("");
      onClose(); // Close the dialog after submitting
    }
  };


  return (
    <Dialog
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Change ATM Pin</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change ATM pin, please verify your account number and enter new ATM pin number.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="accountNumber"
          name="accountNumber"
          label="Account Number"
          type="text"
          value={account?.accountNumber}
          fullWidth
          onChange={handleAccountNumberChange}
        />
        <TextField
          required
          margin="dense"
          id="atmPin"
          name="atmPin"
          label="Change ATM Pin"
          type="number"
          max="4"
          fullWidth
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;