import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listItemDetails, updateItem } from "../actions/itemActions";
import { useParams, useNavigate } from "react-router-dom";

function ItemEditScreen() {
  let { id } = useParams();

  const itemId = id;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [preparationTime, setPreparationTime] = useState(0);
  const [desc, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const { error, loading, item } = itemDetails;
// console.log(item)

  const itemUpdate = useSelector((state) => state.itemUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = itemUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "ITEM_UPDATE_RESET" });
      navigate("/admin/itemlist");
    } else {
      if (!item.title || item._id !== Number(itemId)) {
        dispatch(listItemDetails(itemId));
      } else {
        setName(item.title);
        setPrice(item.price);
        setImage(item.image);
        setPreparationTime(item.preparationTime);
        setCategory(item.category);
        setCountInStock(item.countInStock);
        setDescription(item.desc);
      }
    }
  }, [dispatch, item, itemId, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateItem({
        _id: itemId,
        title: name,
        price,
        image,
        category,
        countInStock,
        preparationTime,
        desc,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    formData.append("item_id", itemId);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/items/upload/", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/itemlist">Go Back</Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Group controlId="formFile" className="mb-3">
                {/* <Form.Label>Choose File</Form.Label> */}
                <Form.Control type="file" onChange={uploadFileHandler} />
              </Form.Group>

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

                
            <Form.Group controlId="preparationTime">
              <Form.Label>Preparation Time</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter preparation time"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

                
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter desc"
                value={desc}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ItemEditScreen;
