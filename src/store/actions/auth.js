
import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const authSuccess = (user) => ({
  type: 'AUTH_SUCCESS',
  payload: user,
});

export const authFailure = (error) => ({
  type: 'AUTH_FAILURE',
  payload: error,
});

export const authenticate = (email, password, isRegistration) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post('http://localhost:5000/api/auth', { email, password, isRegistration });

    const user = response.data;
    console.log(user);
    
  } catch (error) {
    dispatch(authFailure(error));
  }
};
