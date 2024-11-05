import { Col, Container, Row } from "react-bootstrap";
import { TextWrapper, TitleSection } from "../../../../components/Text/Text";
import "./GlobalMarketplaceSection.scss";
import ButtonPrimary from "../../../../components/Button/Button";
import Image from "../../../../components/Image/Image";
import IconSend from "../../../../assets/images/icons/send.svg";
import IconShopAdd from "../../../../assets/images/icons/shop-add.svg";
import IconBag from "../../../../assets/images/icons/bag-timer.svg";
import IconCube from "../../../../assets/images/icons/cube.svg";

export const GlobalMarketplaceSection = () => {
  return (
    <>
      <section className="GlobalMarketplaceSection">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="d-flex justify-content-center">
                <div className="wrap-title">
                  <TitleSection text="NHANH GỌN, TIỆN LỢI"></TitleSection>
                  <TextWrapper text="Thị Trường Nguồn Hàng" fsText="32px" lhText="60px" fsStrong="64px" strong="Đa Quốc Gia" position="right" br="true"></TextWrapper>
                </div>
              </div>
            </Col>

            <Col xs={12}>
              <div className="btn-wrap">
                <ButtonPrimary text="Yêu cầu báo giá"></ButtonPrimary>
              </div>
            </Col>

            <Col xs={12}>
              <div className="d-flex justify-content-center">
                <div className="content-wrap">
                  <div className="content-item">
                    <Image className="icon" src={IconSend}></Image>
                    <div className="content-item-wrap">
                      <strong className="data">49000 +</strong>
                      <br />
                      <span className="name">Báo giá</span>
                    </div>
                  </div>

                  <div className="content-item">
                    <Image className="icon" src={IconShopAdd}></Image>
                    <div className="content-item-wrap">
                      <strong className="data">2000 +</strong>
                      <br />
                      <span className="name">Nhà Bán</span>
                    </div>
                  </div>

                  <div className="content-item">
                    <Image className="icon" src={IconBag}></Image>
                    <div className="content-item-wrap">
                      <strong className="data">{"< 19h"}</strong>

                      <br />
                      <span className="name">Thời gian báo giá</span>
                    </div>
                  </div>

                  <div className="content-item">
                    <Image className="icon" src={IconCube}></Image>
                    <div className="content-item-wrap">
                      <strong className="data">13 +</strong>
                      <br />
                      <span className="name">Nhành hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
