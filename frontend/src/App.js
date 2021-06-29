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
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
