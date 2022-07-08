import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TableListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //   console.log(orders);

  let currOrder = [];
  let available_tables = new Set();
  let not_available_tables = new Set();
  if (orders !== undefined) {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].tableInfo.currentOrder.user === null) continue;
      currOrder.push(orders[i].tableInfo.currentOrder);

      if (!orders[i].tableInfo.currentOrder.availability_status)
        not_available_tables.add(orders[i].tableInfo.tableNo);
      //   else if (!orders[i].tableInfo.currentOrder.availability_status) {
      //     not_available_tables.add(orders[i].tableInfo.tableNo);
      //   }
    }
  }
  // console.log(orders)
  // console.log(currOrder);

    const [info, setInfo] = useState({});
    

  async function availableHandler(tableNo) {
    // console.log(tableNo);
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/orders/table/${tableNo}`,
      { tableNo: tableNo }
    );
    setInfo(data);
    dispatch(listOrders());
  }

    
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }

  }, [dispatch, userInfo, info,setInfo]);

  //   useEffect(() => {

  // availableHandler();
  //   }, []);

  // function availableHandler(tableNo)
  // {

  //     const { data } = await axios.post(
  //         `http://127.0.0.1:8000/api/orders/table/${tableNo}`,
  //         tableNo,

  //     )

  // }
  return (
    <div>
      <h1>Table Information</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>TABLE NO</th>

              <th>ORDER ID</th>
              <th>USER</th>
              {/* <th>DATE</th> */}
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Table Details</th>
            </tr>
          </thead>

          <tbody>
            {[...Array(9).keys()].map((num) => (
              <tr key={num + 1}>
                <td>
                  <h1 className="mt-4">{num + 1}</h1>
                  {not_available_tables.has(num + 1) && (
                    <Button
                      type="button"
                      className="btn-sm"
                      onClick={(e) => availableHandler(num + 1)}
                    >
                      Mark As Available
                    </Button>
                  )}
                </td>

                <td>
                  {orders.map((order) => {
                    if (
                      order.tableInfo.currentOrder.user !== null &&
                      order.tableInfo.tableNo == num + 1
                    )
                      return (
                        <p className="my-4" key={order._id}>
                          {order._id}
                        </p>
                      );
                  })}
                </td>

                <td>
                  {orders.map((order) => {
                    if (
                      order.tableInfo.currentOrder.user !== null &&
                      order.tableInfo.tableNo == num + 1
                    )
                      return (
                        <p className="my-4" key={order._id}>
                          {order.user.name}
                        </p>
                      );
                  })}
                </td>

                <td>
                  {orders.map((order) => {
                    if (
                      order.tableInfo.currentOrder.user !== null &&
                      order.tableInfo.tableNo == num + 1
                    )
                      return (
                        <p className="my-4" key={order._id}>
                          Rs {order.totalPrice}
                        </p>
                      );
                  })}
                </td>

                <td>
                  {orders.map((order) => {
                    if (
                      order.tableInfo.currentOrder.user !== null &&
                      order.tableInfo.tableNo == num + 1
                    )
                      return order.isPaid ? (
                        <p className="my-4" key={order._id}>
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>{" "}
                          {order.paidAt.substring(11, 16)} hrs.
                        </p>
                      ) : (
                        <p className="my-4" key={order._id}>
                          <i
                            className="fas fa-check"
                            style={{ color: "red" }}
                          ></i>
                        </p>
                      );
                  })}
                </td>
                <td>
                  {orders.map((order) => {
                    if (
                      order.tableInfo.currentOrder.user !== null &&
                      order.tableInfo.tableNo == num + 1
                    )
                      return order.isDelivered ? (
                        <p className="my-4" key={order._id}>
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>{" "}
                          {order.deliveredAt.substring(11, 16)} hrs.
                        </p>
                      ) : (
                        <p className="my-4" key={order._id}>
                          <i
                            className="fas fa-check"
                            style={{ color: "red" }}
                          ></i>
                        </p>
                      );
                  })}
                </td>

                <td>
                  {orders.map((order) => {
                    if (
                      order.tableInfo.currentOrder.user !== null &&
                      order.tableInfo.tableNo == num + 1
                    )
                      return (
                        <p key={order._id}>
                          {" "}
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button
                              variant="light"
                              type="button"
                              className="btn-sm"
                            >
                              Details
                            </Button>
                          </LinkContainer>
                        </p>
                      );
                  })}
                  {!not_available_tables.has(num + 1) && (
                    <h4 className="my-3 text-success">Available</h4>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TableListScreen;
