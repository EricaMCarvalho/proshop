import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/user';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '';

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect || '/');
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Faça seu login</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Insira seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type='password'
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Faça seu login
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Client novo?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Cadastre-se
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
