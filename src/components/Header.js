import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import '../styles/Header.css';
import { UserContext } from '../App';
const Header = () => {
  // Context
  const { userData } = useContext(UserContext);

  return (
    <header>
      <div className='container'>
        <div>Cars Adverts</div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            {userData ? (
              <li>
                <Link to='/my-account'>My Account</Link>
              </li>
            ) : (
              <li>
                <Link to='/login'>Log In/ Sign Up</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
