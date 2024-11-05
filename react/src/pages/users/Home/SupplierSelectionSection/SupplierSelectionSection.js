import { Col, Container, Row } from "react-bootstrap";
import { TextWrapper } from "../../../../components/Text/Text";
import "./SupplierSelectionSection.scss";
import { Categories } from "../../../../components/Categories/Categories";
import { CardSupplier } from "../../../../components/CardSupplier/CardSupplier";
import ButtonPrimary from "../../../../components/Button/Button";

import {  useSelector } from "react-redux";


export const SupplierSelectionSection = () => {
  const { top4Supplier } = useSelector((state) => state.user);
  return (
    <>
      <section className="SupplierSelectionSection">
        <Container>
          <Row>
            <Col xs={12}>
              <TextWrapper text="Lựa Chọn" strong="Nhà Cung Cấp"></TextWrapper>
            </Col>
            <Col xs={12}>
              <div className="d-flex justify-content-center category-wrap">
                <Categories></Categories>
              </div>
            </Col>
            <Col xs={12} className="supplier-list">
              <Row>
                {top4Supplier.map((supplier, index) => (
                  <Col xs={12} sm={6} lg={4} xl={3} key={index}>
                    <CardSupplier supplier={supplier}></CardSupplier>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={12} className="">
              <div className="d-flex justify-content-center">
                <ButtonPrimary text="Xem tất cả"></ButtonPrimary>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
