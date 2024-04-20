import * as React from "react";
import AccountDetails from "./AccountDetails";
import AccoiuntTable from "./AccountTable";

export default function Account() {

  const userType = localStorage.getItem('userType');

  return (
    <> 
      {userType == 'TellerPerson' && (
        <AccoiuntTable />
      )}
      {userType == 'AccountHolder' && (
      <AccountDetails />
      )}
    </>
  );
}

