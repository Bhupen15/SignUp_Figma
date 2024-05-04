import React, { useState } from 'react';
import google from '../assets/google.png';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function SignUp() {
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const firstName = formData.get('firstname').trim();
        const lastName = formData.get('lastname').trim();
        const email = formData.get('email').trim();
        const mobile = formData.get('mobile').trim();
        const password = formData.get('encryptpassword').trim();
        const dob = formData.get('dob').trim();
        const termsChecked = formData.get('terms');
        const privacyChecked = formData.get('privacy');
        
        const newErrors = {};

        if (firstName === '') {
            newErrors.firstName = 'First Name is required';
        } else if (firstName.length < 3) {
            newErrors.firstName = 'First name should have atleast 3 characters';
        }

        if (lastName === '') {
            newErrors.lastName = 'Last Name is required';
        } else if (lastName.length < 3) {
            newErrors.lastName = 'Last name should have atleast 3 characters';
        }

        if (email === '') {
            newErrors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (mobile === '') {
            newErrors.mobile = 'Mobile is required';
        } else if (!isValidMobile(mobile)) {
            newErrors.mobile = 'Please enter a valid mobile number';
        }

        if (password === '') {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password should be 6 characters long';
        }

        if (dob === '') {
            newErrors.dob = 'Date of Birth is required';
        } else if (!isValidDate(dob)) {
            newErrors.dob = 'Please enter date in YYYY-MM-DD format';
        }

        if (!termsChecked) {
            newErrors.terms = 'You must agree to the Terms of Service';
        }

        if (!privacyChecked) {
            newErrors.privacy = 'You must agree to the Privacy Policy';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const url = "https://atologistinfotech.com/api/register.php";
            const response = await axios.post(url, formData);
            if (response.data.success === 1) {
                alert("Signup successful");
                event.target.reset(); 
                setErrors({}); 
            } else {
                alert("Signup failed");
            }
        } catch (error) {
            alert("Signup failed: " + error.message);
        }
    };

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const isValidMobile = (mobile) => {
        return /^\d{10}$/.test(mobile);
    };

    const isValidDate = (dob) => {
        return (/^\d{4}-\d{2}-\d{2}$/.test(dob))
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="signup">
            <h2>Welcome to Atologist Infotech</h2>
            <p className='createText'>Create your account</p>
            <a href="#" className="link"><img src={google} alt="google" /></a>
            <h3>OR</h3>
            <form onSubmit={handleSubmit} className="form">
                <div className='d-flex col-12'>
                    <div className="col-6">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input type="text" className="form-control" name="firstname" id="firstname" placeholder="Enter your first name" />
                        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className="col-6">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Enter your last name" />
                        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="col-12">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input type="number" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number" />
                    {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                </div>
                <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="password-input">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            className="form-control" 
                            id="password" 
                            name="encryptpassword" 
                            placeholder="Enter your password" 
                        />
                       <FontAwesomeIcon className='font' icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} />

                    </div>
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="col-12">
                    <label htmlFor="dob" className="form-label">DOB</label>
                    <input type="text" className="form-control" id="dob" name="dob" placeholder="Enter your date of birth" />
                    {errors.dob && <span className="error-message">{errors.dob}</span>}
                </div>
                <div>
                    <p className='m-0'>I agree to</p>
                    <input type="checkbox" name="terms" id="terms" /> <span className='pe-2'> Terms of Service</span>
                    <input type="checkbox" name="privacy" id="privacy" /> <span>Privacy Policy</span>
                    <br/>
                    {errors.terms && <span className="error-message">{errors.terms}<br /></span>}
                    {errors.privacy && <span className="error-message">{errors.privacy}</span>}
                </div>
                <input type="submit" className="submitBtn" value="Create Account" />
            </form>
        </div>
    );
}

export default SignUp;
