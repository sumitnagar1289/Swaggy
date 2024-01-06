import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice.js";
import { CDN_URL } from "../utils/contents.js";

const ItemList = ({ items, dummy }) => {

  const dispatch = useDispatch();
  
  const handleAddItem = (item) => {
    //Dispatch an action
    dispatch(addItems(item));         
  };
  
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left"
        >
          <div>
            <div className="py-2">
              <span className="font-bold">{item?.card?.info?.name}</span>
              <div className="absolute">
                <button className=" p-2 my-2 mx-16 bg-white hover:bg-gray-100 rounded-lg shadow-lg "
                onClick={() => handleAddItem(item)}>
                  Add +
                </button>
              </div>
              <img
                src={CDN_URL + item?.card?.info?.imageId}
                className="h-30 w-30 rounded-lg py-2"
              />
              <span> - ₹ {item?.card?.info?.price / 100}</span>
            </div>
            <p className="text-xs">{item?.card?.info?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
