import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart } from '../actions/cart';

const Cart = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const { loading, error, cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      addToCart(productId, qty);
    }
  }, [dispatch, productId, qty]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          <Col></Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;
