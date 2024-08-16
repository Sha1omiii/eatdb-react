import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as restaurantService from '../../services/restaurantService';
import styles from './RestaurantForm.module.css';

const RestaurantForm = ({handleAddRestaurant, handleUpdateRestaurant}) => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    category: '',
    rating: '',
    review: '',
    foodList: [],
  });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchRestaurant = async () => {
      if (id) {
        try {
          const data = await restaurantService.show(id);
          setRestaurant(data);
        } catch (error) {
          console.error('Error fetching restaurant:', error);
        }
      }
    };
    fetchRestaurant();
  }, [id]);
  const handleChange = (event) => {
    setRestaurant({ ...restaurant, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await handleUpdateRestaurant(id, restaurant);
      } else {
        await handleAddRestaurant(restaurant);
      }
      navigate('/restaurants');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <main className={styles.container}>
      <header>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Restaurant Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={restaurant.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              name="category"
              id="category"
              value={restaurant.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              value={restaurant.rating}
              type="number"
              min="1"
              max="5"
              step="1"
              id="rating"
              name="rating"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea
              name="review"
              id="review"
              value={restaurant.review}
              onChange={handleChange}
            />
          </div>
          <button type="submit">{id ? 'Update' : 'Add Restaurant'}</button>
        </form>
      </header>
    </main>
  );
};
export default RestaurantForm;
