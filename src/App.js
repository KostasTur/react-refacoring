import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Styles
import './globals.css';
// Screens
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import ProtectedRoute from './ProtectedRoute';

// Components
import Header from './components/Header';

// CONTEXT
export const UserContext = createContext();

// STATE MANAGEMENT
// -- Global
// ERNESTO examples using useReduces // not necessary imho simple useState for user data is sufficient as a global state variable

// const initialState = { user: '' };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'REGISTER':
//       return { user: action.payload };
//     case 'LOGIN':
//       return { user: action.payload };
//     case 'LOGOUT':
//       return { user: '' };
//     default:
//       return state;
//   }
// };

// const initialState = {};

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'REGISTER':
//       return action.payload;
//     case 'LOGIN':
//       return action.payload;
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// };

function App() {
  // Hooks
  // -- state
  // const [state, dispatch] = useReducer(reducer, initialState);

  const [userData, setUserData] = useState('');

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/my-account' component={ProtectedRoute} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
