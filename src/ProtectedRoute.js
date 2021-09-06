import React, { useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';
import axios from 'axios';

// Screens (pages)
// import LoginScreen from './Screens/LoginScreen';
import MyAccountScreen from './Screens/MyAccountScreen';

const ProtectedRoute = () => {
  // Hooks
  // -- context
  const { userData, setUserData } = useContext(UserContext);
  // -- redirects
  const history = useHistory();

  // ref for variable used in useEffect
  const userId = useRef(localStorage.getItem('user'));
  const dataExists = useRef(userData);
  // -- side effects
  useEffect(() => {
    if (!userId) {
      history.push('/login');
    }
    if (!dataExists.current) {
      axios
        .get(
          `https://car-adverts-react.herokuapp.com/api/users/${userId.current}`
        )
        .then((res) => {
          setUserData(res.data);
          console.log('fetche');
        })
        .catch((err) => console.log('err', err));
    }
  }, [history, setUserData]);

  return <>{userData && <MyAccountScreen />}</>;
};

export default ProtectedRoute;
