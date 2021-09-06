import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginScreen.css';
const LoginScreen = () => {
  // Hooks
  // -- state
  //   -- global
  // --- local
  // ---- login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  // --- redirects
  const history = useHistory();

  //   refs
  const inputRef = useRef();
  const singupPasswordRef = useRef();
  const singupEmailRef = useRef();

  // ---- signup form
  const [signupName, setSignupName] = useState('');
  const [signupSurname, setSignupSurname] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post('https://car-adverts-react.herokuapp.com/api/users/login', {
        email: loginEmail,
        password: loginPassword,
      })
      .then((res) => {
        const userId = res.data.userId;
        localStorage.setItem('user', userId);
        history.push('/my-account');
      })
      .catch((err) => {
        setLoginEmail('');
        setLoginPassword('');
        setLoginErrorMessage(err.response.data.message);
        inputRef.current.focus();
      });
  };

  const signupUser = (e) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setSignupErrorMessage('Passwords do not match');
      setSignupPassword('');
      setSignupConfirmPassword('');
      singupPasswordRef.current.focus();
      return;
    }
    axios
      .post('https://car-adverts-react.herokuapp.com/api/users/signup', {
        name: signupName,
        surname: signupSurname,
        email: signupEmail,
        password: signupPassword,
      })
      .then((res) => {
        if (res.data.registrationStatus === 'failed') {
          setSignupErrorMessage(res.data.message);
          setSignupPassword('');
          setSignupConfirmPassword('');
          singupEmailRef.current.focus();
        } else if (res.data.registrationStatus === 'success') {
          console.log(res);
          localStorage.setItem('user', res.data.userId);
          history.push('/my-account');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <main>
      <div className='container'>
        <section>
          <h1 className='headline-1'>Sign up/ Log In</h1>
        </section>

        <div className='login-signup-container'>
          <section id='login' className='card-shadow'>
            <h2>
              <span>Have account?</span> Log In!
            </h2>

            <form id='logInForm' className='form' onSubmit={loginUser}>
              <div className='form-control'>
                <label className='form-label' htmlFor='loginEmail'>
                  Email
                </label>
                <input
                  className='form-input'
                  type='email'
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  ref={inputRef}
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='loginPassword'>
                  Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <input
                  type='submit'
                  value='Log In'
                  className='btn-primary btn-primary-submit'
                />
              </div>
            </form>
            {loginErrorMessage && (
              <p id='loginMessage' className='form-message form-message-danger'>
                {loginErrorMessage}
              </p>
            )}
          </section>
          <section id='signup' className='card-shadow'>
            <h2>
              <span>New user?</span> Sign Up!
            </h2>

            <form onSubmit={signupUser} id='signUpForm' className='form'>
              <div className='form-control'>
                <label className='form-label' htmlFor='signUpName'>
                  Name
                </label>
                <input
                  className='form-input'
                  type='text'
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpSurname'>
                  Surname
                </label>
                <input
                  className='form-input'
                  type='text'
                  value={signupSurname}
                  onChange={(e) => setSignupSurname(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpEmail'>
                  Email
                </label>
                <input
                  className='form-input'
                  type='text'
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  ref={singupEmailRef}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpPassword'>
                  Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  ref={singupPasswordRef}
                  required
                />
              </div>

              <div className='form-control'>
                <label className='form-label' htmlFor='signUpConfirmPassword'>
                  Confirm Password
                </label>
                <input
                  className='form-input'
                  type='password'
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className='form-control'>
                <input
                  type='submit'
                  value='Sign Up'
                  className='btn-primary btn-primary-submit'
                />
              </div>
            </form>
            {signupErrorMessage && (
              <p
                id='signUpMessage'
                className=' form-message form-message-danger'
              >
                {signupErrorMessage}
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default LoginScreen;
