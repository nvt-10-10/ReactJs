import { Col, Container, Row } from "react-bootstrap";
import { HeadingSection, TextDescription, TitleSection } from "../../../../components/Text/Text";
import Image from "../../../../components/Image/Image";
import flagVi from "../../../../assets/images/flag/vi.jpg";
import flagLo from "../../../../assets/images/flag/lo.jpg";
import flagKo from "../../../../assets/images/flag/ko.jpg";
import flagZhCn from "../../../../assets/images/flag/zh-cn.jpg";

import  "./GlobalPartnersSection.scss"
export const GlobalPartnersSection = () => {
  return (
    <>
      <section className="GlobalPartnersSection">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} lg={5} className="content">
              <TitleSection text="Đối tác"></TitleSection>
              <HeadingSection text="Quốc gia liên kết với chúng tôi"></HeadingSection>
              <TextDescription text="Chúng tôi hợp tác cùng các đối tác hàng đầu từ Hàn Quốc, Trung Quốc, Việt Nam và Lào, kết hợp sự đa dạng và chất lượng để mang đến giá trị tối ưu cho khách hàng và cộng đồng."></TextDescription>
            </Col>

            <Col xs={12} lg={7} className="media ">
              <div className="d-flex align-items-center float-end ">
                <Image className="flag vi" src={flagVi}></Image>
                <Image className="flag ko" src={flagKo}></Image>
                <Image className="flag zh-cn" src={flagZhCn}></Image>
                <Image className="flag lo" src={flagLo}></Image>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
