// import React from "react";
// import axios from "axios";

// export default function LoginForm() {
//     const [userInput, setUserInput] = React.useState({
//         username: "",
//         password: "",
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setUserInput((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const loginUser = async (credentials) => {
//         try {
//             //console.log('credentials:', credentials);
//             const response = await fetch('http://localhost:5224/api/users/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ UserName: credentials.username, Password: credentials.password })
//             });

//             if (response.status === 200) {
//                 return await response.json();
//             }
//             else {
//                 throw new Error('Login failed');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             return null;
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { username, password } = userInput;

//         const response = await loginUser({ username, password });

//         if (response) {
//             console.log(response);
//             console.log("Login successful");
//             localStorage.setItem('email', response.email);
//             localStorage.setItem('username', response.userName);
//             localStorage.setItem('userType', response.userType);
//             if (response.userType === "TellerPerson")
//                 window.location.href = "/adminDashboard";
//             else if (response.userType === "AccountHolder")
//                 window.location.href = "/userDashboard";
//             else
//                 window.location.href = "/aaa";
//         } else {
//             setUserInput({
//                 username: "",
//                 password: "",
//             });
//             alert("Login Failed! Invalid username or password");
            
//         }
//     };

//     return (
//         <div>
//             <center>
//                 <form onSubmit={handleSubmit}>
//                     <br></br>
//                     <span>Username:</span>
//                     <input type="text" onChange={handleChange} name="username" value={userInput.username}/> <br></br>
//                     <span>Password:</span>
//                     <input type="password" onChange={handleChange} name="password" value={userInput.password} />
//                     <br />
//                     <br />
//                     <button>Login </button>
//                     <br />
//                     <br />
//                     <p>Forget Password?</p>
//                 </form>
//                 <div className="output">
//                     <h2 className="outputtoptext">{userInput.username} </h2><br></br>
//                     <h2 className="bottomtext">{userInput.password}</h2>
//                 </div>
//             </center>
//         </div>
//     );
// }
