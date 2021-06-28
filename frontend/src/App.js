import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route exact path='/' component={Home} />
          <Route path='/produtos/:id' component={ProductDetail} />
          <Route path='/cart/:id?' component={Cart} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
