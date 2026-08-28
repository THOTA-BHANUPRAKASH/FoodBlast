import { useState } from "react";
import { ItemsData } from "../data";

const DisplayItems = () => {
  const [displayItem, setDisplayItem] = useState(ItemsData);

  return (
    <div className="itemSection">
      {displayItem.map((item) => {
        return (
          <div className="gallery" key={item.id}>
            <img src={item.item_img} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayItems;
