import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from '../components/DefaultLayout';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';

const Homepage = () => {
  const [itemsData, setitemData] = useState([]);

  // use effect
  useEffect(()=> {
    const getallitems = async () => {
      try {
          const { data } = await axios.get('/api/items/get-item');
          setitemData(data);
          console.log(data);
      } catch (error) {
          console.log(error);
      }
    };
    getallitems();
  },[]);

  return (
    <div>
        <DefaultLayout>
          <Row>
            {itemsData.map(item => (
              <Col xs={24} lg={6} md={12} sm={6} key={item.id}>
                <ItemList item={item}/>
              </Col>
            ))}
          </Row>
        </DefaultLayout>
    </div>
  )
}

export default Homepage;
