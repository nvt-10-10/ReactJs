import { Col, Container, Row } from "react-bootstrap";
import ButtonPrimary from "../../../../components/Button";
import "./DistributorAndAgentSection.scss";
import Image from "../../../../components/Image";
import imageProduct from "../../../../assets/images/image/productroductp.jpeg";
import iconVi from "../../../../assets/images/flag/vi.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const DistributorAndAgentSection = () => {
  const { top6Products } = useSelector((state) => state.product);
  const base_url = process.env.REACT_APP_API_URL_IMAGE;
  return (
    <>
      <section className="DistributorAndAgentSection">
        <Container>
          <Row>
            <Col xl="6">
              <div className="media">
                <div className="title">BẠN LÀ NHÀ CUNG CÁP ?</div>
                <div>
                  <div>
                    <p className="heading">
                      Tìm <strong>Nhà Phân Phối</strong>{" "}
                    </p>
                    <p className="heading">
                      Tìm <strong>Cộng Tác Viên</strong>{" "}
                    </p>
                    <p className="heading">
                      Tìm <strong>Đại Lý</strong>{" "}
                    </p>
                  </div>

                  <span className="desc">Hãy đăng nhu câu của bạn ngay</span>

                  <ButtonPrimary
                    className="btn action"
                    text="Đăng tin ngay"
                  ></ButtonPrimary>
                </div>
              </div>
            </Col>
            <Col xl="6">
              <div className="content">
                <Row className="product-list g-3">
                  {top6Products?.map((product) => (
                    <Col xl={4}>
                      <div className="product-item">
                        <Image
                          src={`${base_url}${product.image}`}
                          error={imageProduct}
                          className="product-image"
                        ></Image>
                        <Link to={`/product/${product.slug}/${product.code}`}>
                          <h3 className="product-name">{product.name}</h3>
                        </Link>
                        <div className="d-flex align-items-center gap-8 flag">
                          <Image src={iconVi} className="icon-flag"></Image>
                          {product.country ? "Việt Nam" : ""}{" "}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                <div className="btn action">
                  <ButtonPrimary text="Xem thêm"></ButtonPrimary>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
