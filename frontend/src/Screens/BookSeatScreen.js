import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import FormContainer from "../components/FormContainer";
// import CheckoutSteps from "../components/CheckoutSteps";
import { saveTableNo } from "../actions/cartActions";

import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import $ from "jquery";

function BookSeatScreen() {
  const [tableinfo, setTableinfo] = useState();

  let [tempTable, setTempTable] = useState(-1);
  let [tableOption, setTableOption] = useState("-1");
  let [tableNo, setTableNo] = useState("");
// console.log("sedtingt",tableNo)
  let [not_available_tables, setNot_available_tables] = useState(new Set());

  useEffect(() => {
    async function fetchTableInfo() {
      const { data } = await axios.get("/api/orders/table");

      // console.log(data)
      for (let i = 0; i < data.length; i++) {
        // console.log(data[i]["currentOrder"]["user"])
        if(data[i]["currentOrder"]["user"] !==null)
        not_available_tables.add(data[i]["tableNo"]);
      }
    }


    fetchTableInfo();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveSeatHandler = (e) => {
    e.preventDefault();

    if (tableNo ==="") {
      alert("Please book table")
      navigate("/bookseat")
    }
    else {
      // let tableNo = Math.floor(Math.random() * 10) + 1;
      // if (tempTable !== -1) {
      //   // console.log("1st", tableNo);
      //   setTableNo(tempTable);
      //   // console.log("2nd", tableNo);
      // }
      dispatch(saveTableNo({ tableNo }));
      navigate("/payment");
    }
  };

  function selector(e, tableNoSelected) {
    const card = e.target.closest(".card-parent");

    if (card.classList.contains("border-warning"))
      alert("Please select another table, this is already booked");
    else if (card.classList.contains("border-light")) {
      card.classList.remove("border-light");

      if (tempTable !== -1) {
        // console.log($('#table' + tempTable))
        $("#table" + tempTable).removeClass("border-success");
        $("#table" + tempTable).addClass("border-light");
      }
      card.classList.add("border-success");
      setTempTable(tableNoSelected);
      setTableNo(tableNoSelected)
    } //contains border-success
    else {
      card.classList.remove("border-success");
      card.classList.add("border-light");

      setTempTable(-1);
      setTableNo("")

    }

  }



  return (
    <div>
      <CheckoutSteps step1 step2 />
      {/* <FormContainer> */}
      <Form onSubmit={saveSeatHandler}>
        <Form.Group>
          <Form.Label as="legend">TABLE BOOKING</Form.Label>
          <Col>
            <Form.Check
              className="my-1"
              type="radio"
              label="I have already booked the table"
              id="already_booked"
              name="bookTable"
              onChange={(e) => setTableOption("1")}
              required
            ></Form.Check>

            {tableOption === "1" && (
          
                <Form.Group className="my-3" controlId="tableNo">
                  <Form.Label>Table No.</Form.Label>
                  <Form.Control
                    className="w-25"
                    type="number"
                    placeholder="Enter your reserved Table No."
                    value={tableNo}
                    onChange={(e) => setTableNo(e.target.value)}
                    min="1"
                    max="9"
                  ></Form.Control>
                </Form.Group>
              
            )}

            <Form.Check
              className="my-1"
              type="radio"
              label="I want to book a table"
              id="not_booked"
              name="bookTable"
              onChange={(e) => setTableOption("0")}
              required
            ></Form.Check>

            {tableOption === "0" && (
              <Container className="w-75 my-3">
                <h4 className="w-75 my-3">Select the table you want to book</h4>

                <Row
                  lg={6}
                  xl={6}
                  className="d-flex align-items-center justify-content-center"
                >
                  {[...Array(9).keys()].map((x) => (
                    <Col key={x + 1} sm={12} md={6} lg={4} xl={4}>
                      <Card
                        id={`table${x + 1}`}
                        onClick={(e) => selector(e, x + 1)}
                        className={`my-3 p-3 rounded card-parent border-2`}
                        border={`${
                          not_available_tables.has(x + 1) ? `warning` : `light`
                          }`}
                        
                        style={{cursor:"pointer"}}
                      >
                        <Card.Title className="d-flex  justify-content-center">
                          <strong>Table No. {x + 1}</strong>
                        </Card.Title>
                        <Card.Img src="/images/table.png" />

                        <Card.Body>
                          <Card.Text
                            as="div"
                            className="d-flex  justify-content-center"
                          >
                            <strong>
                              {not_available_tables.has(x + 1)
                                ? "Already booked"
                                : tempTable === x + 1
                                ? "BOOK THIS TABLE"
                                : "Available"}
                            </strong>
                          </Card.Text>

                          {/* <Card.Text as="h3">Rsff</Card.Text> */}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            )}
          </Col>
        </Form.Group>

        <Button className="my-4" type="submit" variant="primary">
          {tableOption === "0"
            ? "Book This Table"
            : tableOption === "1"
            ? " Go to payment page"
            : "Book Table"}
        </Button>
      </Form>
    </div>
  );
}

export default BookSeatScreen;
