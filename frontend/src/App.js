import logo from "./logo.svg";
// import { second } from 'first'
import Header from "./components/Header";
import Footer from "./components/Footer";

// import HomeScreen from './Screens/HomeScreen';
import HomeScreen from "./Screens/HomeScreen.js";

import { Container } from "react-bootstrap";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemScreen from "./Screens/ItemScreen";
import CartScreen from "./Screens/CartScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import BookSeatScreen from "./Screens/BookSeatScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";

import UserListScreen from './Screens/UserListScreen'
import UserEditScreen from './Screens/UserEditScreen'

import ItemListScreen from './Screens/ItemListScreen'
import ItemEditScreen from './Screens/ItemEditScreen'
import OrderListScreen from './Screens/OrderListScreen'
import TableListScreen from './Screens/TableListScreen'

import MyOrdersScreen from './Screens/MyOrdersScreen'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />

              <Route path="/item/:id" element={<ItemScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />

              <Route path="/myorders" element={<MyOrdersScreen />} />

              <Route path="/bookseat" element={<BookSeatScreen />} />
              <Route path="/payment" element={<PaymentScreen/>} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              
              <Route path="/order/:id" element={<OrderScreen/>} />


              <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />



          <Route path='/admin/itemlist' element={<ItemListScreen />} />
          <Route path='/admin/item/:id/edit' element={<ItemEditScreen />} />

          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/tablelist' element={<TableListScreen />} />


            </Routes>
          </Container>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
