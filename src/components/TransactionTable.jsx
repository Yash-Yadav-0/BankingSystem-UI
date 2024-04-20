import React from "react";

function TransactionTable({ transactions }) {
    return (
        <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>User Name</th>
                                <th>Transaction Type</th>
                                <th>Amount</th>
                                <th>Transaction Time</th>
                                <th>Transaction Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.accountNumber}</td>
                                    <td>{transaction.userName}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.transactionTime}</td>
                                    <td>{transaction.transactionRemarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    );
}

export default TransactionTable;