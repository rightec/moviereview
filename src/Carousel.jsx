import React, { useState } from 'react'
import ItemsCarousel from 'react-items-carousel'
import './Carousel.css'
import goneWithTheWindImage from './images/1200px-PosterGone_With_the_Wind_01.jpg'
import riseOfSkywalkerImage from './images/Rise_ofSkywalker.jpg'
import pallottolaSpuntataImage from './images/pallottola.jpg'
import tiffanyImage from './images/Breakfast_at_Tiffany.jpg'
import oceanImage from './images/ocean.jpg'
import stargateImage from './images/stargate.jpg'
import jesusImage from './images/jesus.jpg'
/* Defined style class for images in Carousel */
const imgStyle = {
  width: '600px',
  height: '500px'
}

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const chevronWidth = 40
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <img style={imgStyle} src={goneWithTheWindImage} alt='Gone With the wind' />
        <img style={imgStyle} src={riseOfSkywalkerImage} alt='Rise of Skywalker' />
        <img style={imgStyle} src={pallottolaSpuntataImage} alt='Una pallottola spuntata' />
        <img style={imgStyle} src={tiffanyImage} alt='Breakfast at Tiffanys' />
        <img style={imgStyle} src={oceanImage} alt='Ocean 11' />
        <img style={imgStyle} src={stargateImage} alt='stargate' />
        <img style={imgStyle} src={jesusImage} alt='Jesus' />
      </ItemsCarousel>
    </div>
  );
};
