import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from 'react-router-dom'


function Item({ item }) {

  return (
    <Card className="my-3 p-3 rounded">

      <Link to={`/item/${item._id}`}>
        <Card.Img src={item.image} style={{  height: "15vw" ,  objectFit: "cover"}}/>
      </Link>

      <Card.Body>
        <Link to={`/item/${item._id}`}>
          <Card.Title>
            <strong>{item.title}</strong>
          </Card.Title>
        </Link>
            {/* use it as a div */}
        
        <Card.Text as="div">
          <div className="my-3">

            <Rating
              value={item.rating}
              text={`${item.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">Rs {item.price}</Card.Text>
      </Card.Body>
    </Card>
    //   borders to be rounded
  );
}

export default Item;

