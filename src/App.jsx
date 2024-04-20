//to use react router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//define components
import UserAsideBar from './components/AsideBar/UserAsideBar.jsx'
import AdminAsideBar from './components/AsideBar/AdminAsideBar.jsx'

//define teller pages
import AdminLogin from './pages/admin/Login.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'

//define teller pages
import UserDashboard from './pages/UserDashboard.jsx'
import Home from './pages/Home.jsx'

import Team from './pages/Team.jsx'
import ContactUs from './pages/ContactUs.jsx'
import AboutUs from './pages/AboutUs.jsx'
import NoPage from './pages/NoPage.jsx'
import Login from './pages/Login.jsx'
import Transaction from './pages/Transaction.jsx';


//define css files
import './index.css'
import './styles/global.scss'
import AccountTable from './components/accounts/AccountTable.jsx';
import Account from './components/accounts/index.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';


function App() {

  return (
    <div className='App'>
      <Router>
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/@adminLogin" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/aboutUs" element={<AboutUs />} />


            <Route path="/transaction" element={<Transaction />} />

            {/* teller routes */}
            <Route path="/adminhomepage" element={<AdminAsideBar />} />
            <Route path="/adminusers" element={<AdminUsers />} />
            {/* <Route path="/adminaccounts" element={<AccountTable />} /> */}
            <Route path="/account-details" element={<Account />} />

            {/* user routes */}
            <Route path="/userhomepage" element={<UserAsideBar />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            {/* <Route path="/userDashboard" element={<UserDashboard />} /> */}

            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}
export default App;
