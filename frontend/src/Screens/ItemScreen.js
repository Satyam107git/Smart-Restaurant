import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form
} from "react-bootstrap";
import Rating from "../components/Rating";
import items from "../items";
import { useDispatch, useSelector } from "react-redux";
import { listItemDetails } from "../actions/itemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ItemScreen() {
  const [qty, setQty] = useState(1);

  let location = useLocation();
  let { id } = useParams();
  // console.log(location);

  const dispatch = useDispatch();
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;
  useEffect(() => {
    dispatch(listItemDetails(id));
  }, [dispatch, location]);

  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  // console.log(item.countInStock)

  return (
    <div>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={item.image} alt={item.title} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                {/* flush se border wagerah hat gya tha */}
                <ListGroup.Item>
                  <h3>{item.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={item.rating}
                    text={`${item.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price: Rs {item.price}
                  {/* here dolloar is not that part of backticks */}
                </ListGroup.Item>
                <ListGroup.Item>Description: {item.desc}</ListGroup.Item>
                <ListGroup.Item>Preparation Time: {item.preparationTime} minutes</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong> Price: Rs {item.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>
                      <Col>
                        {item.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                      
                  {item.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Select
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                              >
                                {/* The keys() method returns a new Array Iterator object that contains the keys for each index in the array. */}
                            {[...Array(item.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                       
                      <Button  onClick={addToCartHandler} type="button" disabled={item.countInStock === 0}>
                        ADD TO CART
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}

      </div>
    </div>
  );
}

export default ItemScreen;
