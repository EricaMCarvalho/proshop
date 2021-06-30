import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/order';
import { ORDER_PAY_RESET } from '../actions/types';

const Order = ({ match }) => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { success: successPay, loading: loadingPay } = useSelector(
    (state) => state.orderPay
  );

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // if order is not there or needs to be updated
    if (!order || order._id !== match.params.id || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(match.params.id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      }
    } else {
      setSdkReady(true);
    }
  }, [order, match, dispatch, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(match.params.id, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Entrega</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>

              <p>
                <strong>Endereço: </strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Entregue em {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Pedido nao foi entregue</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Forma de pagamento</h2>
              <p>
                <strong>Forma de pagamento:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Pagamento efetuado em {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Pagamento não efetuado</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Seu pedido</h2>
              {order.orderItems.length === 0 ? (
                <Message>Seu pedido está vazio.</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x R${item.price} = R$
                          {item.price * item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card></Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Total</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Itens</Col>
                <Col>R$ {order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Entrega</Col>
                <Col>R$ {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <h5>Total</h5>
                </Col>
                <Col>
                  <h5>R$ {order.totalPrice}</h5>
                </Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay || !sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default Order;
