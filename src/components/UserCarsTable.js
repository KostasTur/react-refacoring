import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import '../styles/MyAccountScreen.css';

const UserCarsTable = ({ id }) => {
  const { userData, setUserData } = useContext(UserContext);
  const deleteCar = (id) => {
    axios
      .delete(`https://car-adverts-react.herokuapp.com/api/cars/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const updatedCars = userData.cars.filter((item) => item._id !== id);
    const newUserData = {
      ...userData,
      cars: updatedCars,
      carMessage: 'Car deleted!',
    };
    setUserData(newUserData);
  };
  return (
    <div id={id}>
      {userData.cars.length > 1 && (
        <table>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.cars.map((item) => (
              <tr key={item._id}>
                <td>{item.make}</td>
                <td>{item.model}</td>
                <td>{item.year}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    className='btn-primary'
                    onClick={() => deleteCar(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserCarsTable;
