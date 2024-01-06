import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { ShimmerPostList } from "react-shimmer-effects";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlinestatus";



const Body = () => {
  
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const[filteredrestaurant, setfilteredrestaurant] = useState([]);
  const [showError,setShowError]=useState(false);

  const [searchText, setsearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


  //whenever state variables update, react trigger reconciliation cycle(re-render the component)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json = await data.json();
  // console.log("apiData",json);
  // optional chaining
    setListOfRestraunt(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);
    setfilteredrestaurant(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);
  };

  const onlineStatus = useOnlineStatus();
  // console.log(listOfRestaurants);

  if(onlineStatus === false) 
  return (
  <h1>
    Looks like you are offline
    </h1>
); 
  
  return listOfRestaurants.length === 0 ? (
    <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className=" search  m-3 p-3">
          <input type="text"
           className="border border-black focus:border-black text-black bg-white focus:bg-white px-1 py-1 rounded-md" placeholder="Search..." 
           value={searchText} 
           onChange={(e) => {
            setsearchText(e.target.value);
          }}
        />
          <button className="p-4 border-black hover:text-cyan-600 hover:scale-110  "
           onClick={() => {

            // console.log(searchText);

            const filteredrestaurant = listOfRestaurants.filter(
              (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
                    
            setfilteredrestaurant(filteredrestaurant.length > 0 ? filteredrestaurant : listOfRestaurants); 
            setShowError(filteredrestaurant.length===0); 
          
          }}
          >Search</button>
        </div>
        <button
          className="px-4 py-1 hover:text-cyan-600 hover:scale-110 "
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
                res => res.info.avgRating > 4.5
              );
              setShowError(false);
              // console.log(filteredList);
              setfilteredrestaurant(filteredList);
             
          }}> Top Rated Restaurants</button>
      </div>
      {showError && <p className="error-message">Sorry, no results found.</p>}
      <div className="flex flex-wrap">
        {
         filteredrestaurant.map((restaurant) => ( 
        <Link 
        key={restaurant.info.id} 
        to= {"/restaurants/" + restaurant.info.id}
        >
          {restaurant.info.promoted ? (
            <RestaurantCardPromoted resData={restaurant} />
          ) : (
            <RestaurantCard resData={restaurant} />
          )}
          </Link> 
        ))}


      </div>
    </div>
  );
};

export default Body;
 
 
