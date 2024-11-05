import { Col, Container, Row } from "react-bootstrap";
import "./BusinessNewsSection.scss";
import Slider from "react-slick/lib/slider";
import Image from "../../../../components/Image/Image";
import iconDate from "../../../../assets/images/icons/date.svg";
import imageNew from "../../../../assets/images/image/news.jpeg";
import { HeadingSection, TextDescription } from "../../../../components/Text/Text";
import ButtonPrimary from "../../../../components/Button/Button";
export const BusinessNewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Hội chợ triển lãm hàng công nghiệp nông thôn tiêu biểu khu vực miền Trung - Tây Nguyên năm 2024",
      date: "04/22/2024 10:33",
      image: imageNew,
    },
    {
      id: 2,
      title: "Triển lãm công nghệ và nông nghiệp hiện đại tại TP. Hồ Chí Minh 2024",
      date: "03/18/2024 09:00",
      image: imageNew,
    },
    {
      id: 3,
      title: "Diễn đàn doanh nghiệp Việt Nam - Hàn Quốc: Cơ hội và thách thức 2024",
      date: "05/10/2024 14:00",
      image: imageNew,
    },

    {
      id: 4,
      title: "Diễn đàn doanh nghiệp Việt Nam - Hàn Quốc: Cơ hội và thách thức 2024",
      date: "05/10/2024 14:00",
      image: imageNew,
    },

    {
      id: 5,
      title: "Diễn đàn doanh nghiệp Việt Nam - Hàn Quốc: Cơ hội và thách thức 2024",
      date: "05/10/2024 14:00",
      image: imageNew,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true, // Tự động chạy
    autoplaySpeed: 2000, // 3 giây mỗi lần chuyển slide
    pauseOnHover: true, // Tạm dừng khi di chuột
    centerMode: false, // Không cần center mode nếu muốn các items cách đều nhau
  };

  return (
    <>
      <section className="BusinessNewsSection">
        <Container>
          <Row className="align-items-center">
            <Col xs={7}>
              <Slider {...sliderSettings}>
                {news.map((article) => (
                  <div className="news-item" key={article.id}>
                    <Image src={article.image} className="news-image" alt={article.title} />
                    <div className="news-item-wrap">
                      <a>
                        <h3 className="news-title">{article.title}</h3>
                      </a>
                      <div className="d-flex align-items-center gap-8 news-date">
                        <Image src={iconDate} className="icon-date" alt="Date icon" />
                        {article.date}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </Col>
            <Col xs={5}>
              <div className="content">
                <HeadingSection text="Tin Tức Thương Mại"></HeadingSection>
                <TextDescription text="Khám phá thế giới Thương Mại với thông tin đầy đủ và cập nhật trên website của chúng tôi. Cung cấp các tin tức, xu hướng và dữ liệu mới nhất về thị trường, giúp bạn hiểu rõ hơn về các hoạt động kinh doanh và đưa ra quyết định thông minh."></TextDescription>

                <ButtonPrimary text="Xem thêm" className="btn action"></ButtonPrimary>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
