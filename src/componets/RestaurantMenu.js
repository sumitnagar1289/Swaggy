import { ShimmerPostList } from "react-shimmer-effects";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {
    // const [resInfo, setResInfo] = useState(null);

    const { resId } = useParams();

    const dummy = "Dummy data";

    const resInfo =  useRestaurantMenu(resId);


    // useEffect (() => {
    //     fetchMenu();
    // }, [])

    // const fetchMenu = async () => {
    //     const data = await fetch(MENU_API + resId );
    //         const json = await data.json();

    //         console.log("menuData", json);
    //         setResInfo(json.data); 
    // };

    const [showIndex, setshowIndex] = useState(null);

    if(resInfo === null) return <ShimmerPostList postStyle="STYLE_FOUR" col={3} row={2} gap={30} />; 

    const { name,cuisines, costForTwoMessage } = 
    resInfo?.cards[0]?.card?.card?.info; 

    const { itemCards} = 
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
    ?.card;

    const categories =  resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) => 
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    
    return ( 
         <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{
            cuisines.join(", ")}- {costForTwoMessage}
            </p>
            {/* */}
            {categories.map((category, index) => (
                <RestaurantCategory 
                key = {category?.card?.card?.title} 
                data = {category?.card?.card}
                showItems = { index === showIndex ? true : false}
                setshowIndex = {() => setshowIndex(index)}
                dummy = {dummy}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;