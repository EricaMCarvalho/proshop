import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import Products from './screens/Products';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import Payment from './screens/Payment';
import PlaceOrder from './screens/PlaceOrder';
import Order from './screens/Order';
import UserList from './screens/UserList';
import UserEdit from './screens/UserEdit';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route exact path='/' component={Home} />
          <Route exact path='/produtos' component={Products} />
          <Route path='/users/:id' component={Profile} />
          <Route path='/profile' component={Profile} />
          <Route path='/produtos/:id' component={ProductDetail} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/payment' component={Payment} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/orders/:id' component={Order} />
          <Route exact path='/admin/users' component={UserList} />
          <Route path='/admin/users/:id' component={UserEdit} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
