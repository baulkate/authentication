import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import zxcvbn from 'zxcvbn';



const LoginForm = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: null
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const result = zxcvbn(e.target.value);
    setPasswordStrength({
      score: result.score,
      feedback: result.feedback.warning
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail() && validatePassword()) {
      // Hypothetical: Send data to your backend authentication system
      console.log('Form submitted with:', email, password);
    } 
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    // Adjust these rules based on your requirements
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  };
  return (
    <div className='wrapper'>
        <form onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <div className='input-box'>
                <input type='email' id='email' placeholder='Username' value={email} onChange={handleEmailChange} required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type='password' id='password' placeholder='Password' value={password} onChange={handlePasswordChange} required/>
                <FaLock className='icon' />

                {passwordStrength.feedback && (
                    <p className={`text-${getStrengthClass(passwordStrength.score)}`}>{passwordStrength.feedback}</p>
                )}

            </div>

    
            <button type='submit'>LOGIN</button>

        </form>
      
    </div>
  )
}

const getStrengthClass = (score) => {
    if (score <= 2) return 'danger';
    if (score === 3) return 'warning';
    return 'success'; 
  }

export default LoginForm
