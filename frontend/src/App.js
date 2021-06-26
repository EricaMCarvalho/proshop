import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route exact path='/' component={Home} />
          <Route exact path='/produtos/:id' component={ProductDetail} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
