import React from "react";

import Navbar from '../components/Navbar.jsx'

export default function AboutUs() {
    return (
        <div>
            <Navbar />
            <div style={{ backgroundColor: 'lightgreen', height: '15rem', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                <h2>About Us</h2>
                <br />
                <p>Welcome to our banking system, where we strive to provide you with the best financial services.
                    <br></br> Our mission is to make banking simple, secure, and convenient for you.</p>
            </div>

            <h2>Our Vision</h2>
            <p>Our vision is to be the most trusted and preferred banking partner, offering innovative solutions and excellent customer service. We aim to build long-lasting relationships with our customers and be a reliable partner in their financial journey.</p>

            <h2>Our Values</h2>
            <ul>
                <li><strong>Integrity:</strong> We uphold the highest ethical standards in all our interactions.</li>
                <li><strong>Customer Focus:</strong> We are committed to meeting and exceeding our customers' expectations.</li>
                <li><strong>Innovation:</strong> We continuously innovate to provide our customers with better solutions.</li>
                <li><strong>Teamwork:</strong> We work together as a team to achieve our goals.</li>
            </ul>
        </div>
    )
}

