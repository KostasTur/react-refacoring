import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  // data from api with users and cars (data.cars=[...])
  const [data, setData] = useState('');
  useEffect(() => {
    axios
      .get('https://car-adverts-react.herokuapp.com/api/cars')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      {data ? (
        <div className='container'>
          <section>
            <h1 className='headline-1'>Latest Cars for Sale</h1>
          </section>
          <section>
            <div id='latest-cars'>
              {data.map((item) =>
                item.cars.map((carsItem) => (
                  <div className='car card-shadow' key={carsItem._id}>
                    <h4>
                      {carsItem.make} {carsItem.model}
                    </h4>
                    <p>Year: {carsItem.year}</p>
                    <p>Price: ${carsItem.price.toFixed(2)}</p>
                    <p>
                      Seller: {item.name} {item.surname}
                    </p>
                    <p>Email: {item.email}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      ) : (
        <h2>loading...</h2>
      )}
    </main>
  );
};

export default HomeScreen;
