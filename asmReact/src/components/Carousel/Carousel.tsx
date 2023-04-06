import React from 'react'
import { Carousel } from "antd"
import './Carousel.css';


const CarouselCustom = () => {
  return (
    <Carousel autoplay>
        <div>
          <h3 className='carousel-item'>1</h3>
        </div>
        <div>
          <h3 className='carousel-item'>2</h3>
        </div>
        <div>
          <h3 className='carousel-item'>3</h3>
        </div>
        <div>
          <h3 className='carousel-item'>4</h3>
        </div>
      </Carousel>
  )
}

export default CarouselCustom