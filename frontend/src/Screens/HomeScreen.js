import React,{useState,useEffect} from "react";

// import items from "../items.js";
import Item from '../components/Item'
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listItems } from "../actions/itemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

import axios from 'axios'

function HomeScreen() {




    // const [products, setProducts] = useState([]);
  //we want to get rid of this local state
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.itemList);
  let { error, loading, items } = itemList;
  useEffect(() => {
    dispatch(listItems());

  }, [dispatch]);




return (
  <div>

    <h1>Delicious Food Items</h1>
    {loading ? (
      <Loader />
    ) : error ? (
        <Message variant='danger'>
          {error}</Message>
    ) : (
      <Row>
        {items.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
            <Item item={item} />
          </Col>
        ))}
      </Row>
    )}

  </div>
);
}


export default HomeScreen;
