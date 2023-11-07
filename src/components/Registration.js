import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { authenticate } from '../store/actions/auth';

const Registration = () => {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setAlert({ message: 'Passwords did not match', type: 'danger' });
      return;
    }

    try {
      const isRegistration = true;
      const { email, password } = formData;

      const response = await dispatch(authenticate(email, password, isRegistration));

      if (response.status === 201) {
        setAlert({ message: 'Registration successful!', type: 'success' });
        navigate('dashboard');
      } else {
        setAlert({ message: 'Registration failed. Please try again.', type: 'danger' });
      }
    } catch (error) {
      setAlert({ message: 'Registration failed due to an error. Please try again.', type: 'danger' });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Registration</h5>

              {alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              )}

              <form onSubmit={handleRegistration}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <p className="mt-3">Already have an Account? <Link to="/login">Sign Up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null)(Registration);
