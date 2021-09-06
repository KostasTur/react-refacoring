import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../App';

import { FaUserAlt } from 'react-icons/fa';

const UserInfoCard = ({ id, className }) => {
  const { userData, setUserData } = useContext(UserContext);
  // --- redirects
  const history = useHistory();
  return (
    <div id={id} className={className}>
      {userData && (
        <>
          <div>
            <FaUserAlt size='2em' />
          </div>
          <h3>
            {userData.name} {userData.surname}
          </h3>
          <p>{userData.email}</p>
          <p>Cars for sale: {userData.cars.length}</p>
          <button
            className='btn-primary'
            onClick={() => {
              localStorage.removeItem('user');
              setUserData('');
              history.push('/');
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfoCard;
