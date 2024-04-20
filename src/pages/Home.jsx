import React from "react";
import axios from "axios";

import Navbar from '../components/Navbar.jsx'

export default function Home() {


    // const submitDisplay = async () => {
    //     console.log("jhjgnjh");
    //     const response = await axios.get("http://localhost:5224/api/users");
    //     console.log("response", response);
    //     return await response.json();
    // };
    return (
        <div className="container">       
          <Navbar />
            {/* <h1>Hello world! This is from Home page</h1> */}
            <div className="img-container">
                    <img className="img" src="/assets/image/money.jpg"></img>
            </div>
            
            {/* <button onClick={submitDisplay}>Submit</button> */}
        </div>
    )
}

