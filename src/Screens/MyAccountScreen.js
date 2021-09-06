import axios from 'axios';
import React, { useReducer, useRef, useContext } from 'react';
import { UserContext } from '../App';
// import '../styles/MyAccountScreen.css';
// components
import UserCarsTable from '../components/UserCarsTable';
import UserInfoCard from '../components/UserInfoCard';

// state for add car form (could be empty object  but we it for readability)
const initailFormState = {
  make: '',
  model: '',
  year: '',
  price: '',
  message: '',
};
// simplified useReducer for state variables of the add Car form
// --- could add swith cases to use for form clearing after submit ---
const formReducer = (state, action) => {
  return { ...state, [action.field]: action.payload };
};

const MyAccountScreen = () => {
  // Hooks
  // state
  // -- global
  const { userData, setUserData } = useContext(UserContext);
  // const { state } = useContext(UserContext);
  const [formData, setFormData] = useReducer(formReducer, initailFormState);

  // userId value reference from local storage
  const userId = useRef(localStorage.getItem('user'));

  // element refs
  const yearInputRef = useRef();
  const priceInputRef = useRef();

  // custom functions
  // send form
  const handleSublit = (e) => {
    e.preventDefault();
    const { make, model, year, price } = formData;
    // validation
    if (isNaN(+year)) {
      setFormData({ field: 'year', payload: '' });
      setFormData({ field: 'message', payload: 'Year must be a number!' });
      yearInputRef.current.focus();
      console.log(formData);
      return;
    } else if (isNaN(+price)) {
      setFormData({ field: 'price', payload: '' });
      setFormData({ field: 'message', payload: 'Price must be a number!' });
      priceInputRef.current.focus();
      return;
    }

    axios
      .put(
        `https://car-adverts-react.herokuapp.com/api/cars/add/${userId.current}`,
        { make: make, model: model, year: +year, price: +price }
      )
      .then((res) => {
        //can setUserCars here as response provide user cars
        setUserData(res.data);

        setFormData({ field: 'message', payload: 'Car added!' });

        // this is just a hint to do form cleaning
        // setFormData(initailFormState); maybe add timout here so the message can be seen for a bit
        console.log(res.data);
      })
      .catch((err) => console.log('err', err));
  };

  const handleChange = (e) => {
    setFormData({
      field: e.target.name,
      payload: e.target.value,
    });
  };

  return (
    <main>
      <div className='container'>
        <section>
          <h1 className='headline-1'>
            {userData ? `Hello, ${userData.name}` : 'loading...'}
          </h1>
        </section>
        <section id='user'>
          <UserInfoCard id='user__info' className='card-shadow' />
          <div id='user__cars'>
            <UserCarsTable id='user__cars-list'></UserCarsTable>
            <div id='user__cars-add-new' className='card-shadow'>
              <h6>Have car for sale?</h6>
              <h2>Enter Information</h2>

              <form className='form' onSubmit={handleSublit}>
                <div className='form-control'>
                  <label className='form-label' htmlFor='carMake'>
                    Make
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    name='make'
                    value={formData.make}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carModel'>
                    Model
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    name='model'
                    value={formData.model}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carYear'>
                    Year
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    name='year'
                    value={formData.year}
                    onChange={(e) => handleChange(e)}
                    ref={yearInputRef}
                    required
                  />
                </div>

                <div className='form-control'>
                  <label className='form-label' htmlFor='carPrice'>
                    Price
                  </label>
                  <input
                    className='form-input'
                    type='text'
                    name='price'
                    value={formData.price}
                    onChange={(e) => handleChange(e)}
                    ref={priceInputRef}
                    required
                  />
                </div>

                <div className='form-control'>
                  <input
                    type='submit'
                    value='Add Car'
                    className='btn-primary btn-primary-submit'
                  />
                </div>
              </form>
              {formData.message && (
                <p className='form-message form-message-danger'>
                  {formData.message}
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MyAccountScreen;
