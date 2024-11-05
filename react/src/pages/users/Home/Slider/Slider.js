import Carousel from 'react-bootstrap/Carousel';
import imageSlider1 from "../../../../assets/images/image/slider-1.jpg"
import Image from "../../../../components/Image/Image"
import "./Slide.scss"
export  const  Slider = () => {
  return (
    <div className="slider" >

    <Carousel indicators={false} controls={false}>
      <Carousel.Item interval={1000}>
      <Image src={imageSlider1} />
      
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <Image src={imageSlider1} />
     
      </Carousel.Item>
      <Carousel.Item>
      <Image src={imageSlider1} />
      
      </Carousel.Item>
    </Carousel>
    </div>
  );
}
