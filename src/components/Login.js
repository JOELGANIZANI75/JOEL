import React, { useState } from 'react';
import { useNotifications } from './Alert';
import { useUser } from './user';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { addNotification } = useNotifications();
  const { loginUser, registerUser } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [registerDetails, setRegisterDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    gender: ''
  });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleLogin = () => {
    const { username, password } = loginDetails;
    if (!username || !password) {
      setMessage('Please enter both username and password');
      return;
    }

    if (password.length < 8) {
      setMessage('Password is too short. Please enter at least 8 characters.');
      return;
    }

    const user = loginUser(username, password);

    if (user) {
      setMessage('Login successful');
      addNotification('Login Successful', 'You have successfully logged in');
      if (user.accountType === 'Student') {
        navigate("/HeroSection");
      } else if (user.accountType === 'Landlord') {
        navigate("/LandlordDashboard");
      } else if (user.accountType === 'Admin') {
        navigate("/AdminDashboard");
      }
    } else {
      setMessage('Account does not exist');
    }
  };

  const handleCreateAccount = () => {
    const { firstName, lastName, username, dateOfBirth, email, password, confirmPassword, accountType, gender } = registerDetails;
    if (!firstName || !lastName || !username || !dateOfBirth || !email || !password || !confirmPassword || !accountType || !gender) {
      setMessage('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setMessage('Password is too short. Please enter at least 8 characters.');
      return;
    }

    const newUser = { firstName, lastName, username, dateOfBirth, email, password, accountType, gender };
    registerUser(newUser);
    setMessage('Account created successfully');
    addNotification('Account Created', 'You have successfully created an account');
    setIsLogin(true);
  };

  const handleResetPassword = () => {
    if (!loginDetails.email) {
      setMessage('Please enter your email');
      return;
    }

    // Implement password reset logic here
    setMessage('Reset link sent to your email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isForgotPassword ? (
          <form className="mt-8 space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange(setLoginDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleResetPassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => { setIsForgotPassword(false); setIsLogin(true); }}
                className="mt-3 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Back to Login
              </button>
            </div>
          </form>
        ) : isLogin ? (
          <form className="mt-8 space-y-6">
            <input
              type="text"
              name="username"
              placeholder="Registration Number"
              onChange={handleInputChange(setLoginDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleInputChange(setLoginDetails)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="mt-3 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="mt-3 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Create Account
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleInputChange(setRegisterDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange(setRegisterDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange(setRegisterDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <input
              type="date"
              name="dateOfBirth"
              placeholder="Date of Birth"
              onChange={handleInputChange(setRegisterDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange(setRegisterDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleInputChange(setRegisterDetails)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange(setRegisterDetails)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            />
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="accountType"
                  value="Student"
                  onChange={handleInputChange(setRegisterDetails)}
                  className="form-radio"
                />
                <label className="ml-2">Student</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="accountType"
                  value="Landlord"
                  onChange={handleInputChange(setRegisterDetails)}
                  className="form-radio"
                />
                <label className="ml-2">Landlord</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="accountType"
                  value="Admin"
                  onChange={handleInputChange(setRegisterDetails)}
                  className="form-radio"
                />
                <label className="ml-2">Admin</label>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleInputChange(setRegisterDetails)}
                  className="form-radio"
                />
                <label className="ml-2">Male</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleInputChange(setRegisterDetails)}
                  className="form-radio"
                />
                <label className="ml-2">Female</label>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="mt-3 font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Sign in
              </button>
            </div>
          </form>
        )}
        {message && <p className="mt-2 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
