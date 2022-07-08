import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { tableInfo } = cart;

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  if (!tableInfo.tableNo) {
    navigate("/bookseat");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Pay Online"
              id="pay_online"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              value="Pay Online"
              required
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Pay Cash"
              id="pay_cash"
              name="paymentMethod"
              value="Pay Cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
