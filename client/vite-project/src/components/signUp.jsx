import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/signUp.css";

function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 🔒 Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Password and Confirm Password do not match");
            return;
        }

        fetchData();
        console.log(formData);
    };

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error("Error signing up:", error);
        }
    }

    return (
        <div className="container">
            <div className="signup-box">
                <h2>Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Sign Up</button>

                    <p className="auth-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;