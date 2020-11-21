import React, { useState } from 'react'
import ItemsCarousel from 'react-items-carousel'
import './Carousel.css'
import goneWithTheWindImage from './images/1200px-PosterGone_With_the_Wind_01.jpg'

const imgStyle = {
  width: '500px',
  height: '300px'
}

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 40
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={2}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <img style={imgStyle} src={goneWithTheWindImage} alt='Gone With the wind' />
        <img style={imgStyle} src={goneWithTheWindImage} alt='Gone With the wind' />
        <img style={imgStyle} src={goneWithTheWindImage} alt='Gone With the wind' />
        <img style={imgStyle} src={goneWithTheWindImage} alt='Gone With the wind' />
      </ItemsCarousel>
    </div>
  );
};
