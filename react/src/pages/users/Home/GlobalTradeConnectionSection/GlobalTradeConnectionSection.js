import { Col, Container, Row } from "react-bootstrap";
import "./GlobalTradeConnectionSection.scss";
import Image from "../../../../components/Image/Image";
import bg1 from "../../../../assets/images/background/GlobalTradeConnectionSection-1.jpeg";
import bg2 from "../../../../assets/images/background/GlobalTradeConnectionSection-2.jpeg";
import iconCheck from "../../../../assets/images/icons/check.svg";
import { HeadingSection, TextDescription, TitleSection } from "../../../../components/Text/Text";
import ButtonPrimary from "../../../../components/Button/Button";
export const GlobalTradeConnectionSection = () => {
  return (
    <>
      <section className="GlobalTradeConnectionSection">
        <Container>
          <Row className="align-items-center">
            <Col xl={7} className="media">
              <div className="d-flex align-items-center gap-24">
                <Image src={bg1} className="image"></Image>
                <Image src={bg2} className="image"></Image>
              </div>
            </Col>
            <Col xl={5}>
              <div className="content">
                <TitleSection text="Giới thiệu"></TitleSection>
                <HeadingSection text="kết nối tạo giá trị giao thương mọi nơi"></HeadingSection>

                <TextDescription className="mt-24" text="Chúng tôi hướng đến việc tạo ra các kết nối mang lại giá trị không chỉ trong giao thương mà còn trong mối quan hệ và sự phát triển bền vững"></TextDescription>

                <ul className="mt-26">
                  <li className="d-flex gap-10">
                    <Image src={iconCheck} className="icon-check"></Image>
                    <div>
                      <h5 className="title">Mở rộng thị trường</h5>
                      <TextDescription text="Bằng cách kết nối với các đối tác trên toàn thế giới, bạn có cơ hội tiếp cận vào các thị trường mới và mở rộng phạm vi kinh doanh của mình." className="mt-10"></TextDescription>
                    </div>
                  </li>

                  <li className="d-flex gap-10 mt-26">
                    <Image src={iconCheck} className="icon-check"></Image>
                    <div>
                      <h5 className="title">Xây dựng mối quan hệ bền vững</h5>
                      <TextDescription text="Việc xây dựng các mối quan hệ với các đối tác không chỉ mang lại lợi ích ngắn hạn mà còn tạo ra cơ hội cho sự phát triển bền vững và hợp tác lâu dài." className="mt-10"></TextDescription>
                    </div>
                  </li>
                </ul>

                <ButtonPrimary text="Xem thêm" className="btn action mt-26"></ButtonPrimary>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
