import { useState, useEffect } from "react";
// import { IoIosStar } from "react-icons/io"; 
import { Link, useParams } from "react-router-dom";
import * as restaurantService from '../../services/restaurantService';

//mocking a restaurant until the backend is done
// const mockRestaurant = [
//     {id: 1, name: 'pink onion', category: 'Italian', rating: 5, review: 'best pizza spot in SF', foodList: []},
//     {id: 2, name: 'shi shi', category: 'Japanese', rating: 3, review: 'good vibes', foodList: []},
//     {id: 3, name: 'linlin', category: 'Indian', rating: 3.5, review: 'had a great time with my wife, great service', foodList: []},
//     {id: 4, name: 'sfasfa', category: 'American', rating: 0, review: 'terrible food and service', foodList: []},
// ]

const SingleRestaurant = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();

    const handleAddFood = async (foodFormData) => {
        const newFood = await restaurantService.createFood(restaurantId, foodFormData)
        setRestaurant({ ...restaurant, foodList: [...restaurant.foodList, newFood] })
      }

    useEffect(() => {
        const getSingleRestaurant = async () => {
            const returnedData = await restaurantService.show(id);
            setRestaurant(returnedData);
        } 
        getSingleRestaurant();
        
    }, [id]);
    if (!restaurant) {
        return <div>No restaurant found in the database</div>
    }
    return (
        <>
            <div>
                <h1>{restaurant.name}</h1>
                <p>Ctg: {restaurant.category}</p>
                <p>Rating: {restaurant.rating}</p>
                <p>Reviews: {restaurant.review}</p>
                <h3><strong>FoodList</strong></h3>
                <ul>
                    {restaurant.foodList.length > 0 ? (
                        restaurant.foodList.map((food, index) => (
                            <li key={index}>
                                <p>{food.name}</p>
                                <p>{food.ingredients}</p>
                                <p>{food.isVegan ? "Vegan" : "Not Vegan"}</p>
                                <p>Food Rating: {food.rating}</p>
                                <p>Price: {food.price}</p>
                                <Link to={`/restaurants/${id}/food/edit/${food._id}`}>Edit Food</Link>
                            </li>
                        ))
                    ) : (
                        <p>Nothing is in foodList</p>
                    )} 
                </ul>
                <Link to={`/restaurants/${id}/food/new`}>Add Food/Menu</Link>
            </div>
        </>
    ) 
}

export default SingleRestaurant;