import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormDialog from "./FormDialog";
import AlertDialog from "./AlertDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [accounts, setAccounts] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [accountToDelete, setAccountToDelete] = React.useState(null);
  const [accountToEdit, setAccountToEdit] = React.useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  // Retrieve the JWT token from local storage
  const token = localStorage.getItem('token');

  // Set the Authorization header with the JWT token
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  React.useEffect(() => {
    console.log("Fetching accounts...");
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5224/api/accounts", {
          withCredentials: true, // Add withCredentials option
          headers: config.headers // Send token in headers
        });
        setAccounts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDeleteAccount = async () => {
    try {
      // Make an API call to delete the account
      await axios.delete(
        `http://localhost:5224/api/accounts/${accountToDelete.accountId}`
      );
      // Update the accounts state by filtering out the deleted account
      setAccounts(
        accounts.filter((acc) => acc.accountId !== accountToDelete.accountId)
      );
      // Reset the accountToDelete state
      setAccountToDelete(null);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  // const handleEditAccount = async () => {
  //   try {
  //     // Make an API call to delete the account
  //     const response = await axios.get(
  //       `http://localhost:5224/api/accounts/${accountToEdit.accountId}`
  //     );
  //     setAccountToEdit(response);
  //   } catch (error) {
  //     console.error("Error editingting account:", error);
  //   }
  // };



  return (
    <>
      {isLoading ? (
        <CircularIndeterminate />
      ) : Array.isArray(accounts) && accounts.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Account Number</StyledTableCell>
                <StyledTableCell align="right">Balance</StyledTableCell>
                <StyledTableCell align="right">ATM Card Number</StyledTableCell>
                <StyledTableCell align="right">ATM Card Pin</StyledTableCell>
                <StyledTableCell align="right">Created Time</StyledTableCell>
                <StyledTableCell align="right">Modified Time</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account) => (
                <StyledTableRow key={account.accountId}>
                  <StyledTableCell component="th" scope="row">
                    {account.accountNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {account.balance}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {account.atmCardNum}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {account.atmCardPin}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {account.createdAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {account.modifiedAt}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Button onClick={() => setAccountToDelete(account)}>
                        <DeleteIcon />
                      </Button>
                      <AlertDialog
                        open={!!accountToDelete}
                        onClose={() => setAccountToDelete(null)}
                        onConfirm={handleDeleteAccount}
                        account={accountToDelete}
                      />
                      <Button onClick={() => {
                        setAccountToEdit(account);
                        handleClickOpen();
                      }}>
                        <EditIcon />
                      </Button>
                      <FormDialog
                        open={open}
                        onClose={handleClose}
                        onOpen={handleClickOpen}
                        account={accountToEdit}
                        accountNumber={accountToEdit?.accountNumber}
                      />
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No accounts found.</p>
      )}
    </>
  );
}

export function CircularIndeterminate() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
