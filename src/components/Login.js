import React, { useState } from 'react';
import { useDispatch, connect           } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import  login   from '../store/reducers/auth';
import { authenticate } from '../store/actions/auth';

const Login = ({login}) => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isRegistration = false;

      await dispatch(authenticate(email, password, isRegistration));
      setAlert({ message: '', type: '' });
      navigate('/dashboard');
    } catch (error) {
      setAlert({ message: 'Login failed. Please check your email and password.', type: 'danger' });
      console.log('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header">Login</div>
            <div className="card-body">
              {alert.message && (  
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}  
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <p className="mt-3">No Account, yet? <Link to="/register">Sign Up</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { login })(Login);
