import { Col, Container, Row } from "react-bootstrap";
import "./WholesaleSupplierSection.scss";
import Image from "../../../../components/Image/Image";
import { HeadingSection, TitleSection } from "../../../../components/Text/Text";
import IconCategory from "../../../../assets/images/icons/brands.svg";
import ButtonPrimary from "../../../../components/Button/Button";
import { useSelector } from "react-redux";
export const WholesaleSupplierSection = () => {
  const base_url_image = process.env.REACT_APP_API_IMAGE;
  const {categories,error,loading} = useSelector((state) => state.category);
  const evenIndexArray = categories.filter((_, index) => index % 2 === 0);
  const oddIndexArray = categories.filter((_, index) => index % 2 !== 0);
  return (
    <>
      <section className="WholesaleSupplierSection">
        <Container>
          <div className="d-flex">
            <div className="category-list">
              {evenIndexArray?.map((category) => (
                <div className="category-item" key={category.id}>
                  <figure>
                    <Image src={`${base_url_image}${category.image}`} className="icon" srcError={IconCategory}>
                    </Image>
                  </figure>

                  <div className="category-wrap">
                    <h3 className="category-name">{category.name}</h3>
                    <br />
                    <span className="category-count">{category.count}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mid">
              <div className="content-wrap">
                <TitleSection text="bạn là doanh nghiệp, tiểu thương?"></TitleSection>
                <HeadingSection className="heading" text="Nguồn Hàng Sỉ Hảng Bán Buôn"></HeadingSection>
                <a className="link">Theo doanh mục</a>

                <ButtonPrimary text="Xem tất cả" className="btn action"></ButtonPrimary>
              </div>
            </div>

            <div className="category-list">
              <div className="category-list">
                {oddIndexArray?.map((category) => (
                  <div className="category-item" key={category.id}>
                    <figure>
                      <Image src={`${base_url_image}${category.image}`  } className="icon" srcError={IconCategory}> </Image>
                    </figure>

                    <div className="category-wrap">
                      <h3 className="category-name">{category.name}</h3>
                      <br />
                      <span className="category-count">{category.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
