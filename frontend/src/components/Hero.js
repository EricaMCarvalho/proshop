import React from 'react';
import { Carousel, Button, Image } from 'react-bootstrap';

const Hero = () => {
  return (
    <Carousel className='hero mb-5'>
      <Carousel.Item>
        <Image
          className='d-block w-100 portrait'
          src='/images/macarons2.jpg'
          alt='Second slide'
        />
        <Image
          className='d-block w-100 landscape'
          src='/images/macarons.jpeg'
          alt='Second slide'
        />
        <Carousel.Caption className='hero-content'>
          <h3>Roma Doces de Vitrine</h3>
          <h5>Amor em forma de doce</h5>
          <Button
            className='badge rounded-pill bg-primary mt-3 p-3'
            type='button'
          >
            Peça pelo WhatsApp
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100 portrait'
          src='/images/macarons2.jpg'
          alt='Second slide'
        />
        <Image
          className='d-block w-100 landscape'
          src='/images/macarons.jpeg'
          alt='Second slide'
        />
        <Carousel.Caption className='hero-content'>
          <h3>Roma Doces de Vitrine</h3>
          <h5>Amor em forma de doce</h5>
          <Button
            className='badge rounded-pill bg-primary mt-3 p-3'
            type='button'
          >
            Conheça nossos produtos
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className='d-block w-100 portrait'
          src='/images/macarons2.jpg'
          alt='Second slide'
        />
        <Image
          className='d-block w-100 landscape'
          src='/images/macarons.jpeg'
          alt='Second slide'
        />
        <Carousel.Caption className='hero-content'>
          <h3>Roma Doces de Vitrine</h3>
          <h5>Amor em forma de doce</h5>
          <Button
            className='badge rounded-pill bg-primary mt-3 p-3'
            type='button'
          >
            Conheça nosso Instagram
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Hero;
