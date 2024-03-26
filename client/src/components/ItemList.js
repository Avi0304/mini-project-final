import React from "react";
import { Card } from "antd";

const ItemList = ({ item }) => {
  const { Meta } = Card;
  return (
    <div style={{margin: '20px'}}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{height: 200, border: "none"}}
          />
        }
      >
        <Meta title={item.name} description={item.price}/>
      </Card>
    </div>
  );
};

export default ItemList;
