import { Header } from "./header";
import { Col, Container, Row } from "react-bootstrap";
import "./quoteList.scss";
import { Categories } from "../../../../components/Categories";
import { QuoteItem } from "./quoteItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quoteThunk } from "../../../../redux-slice/quote/thunk";
import { MyPagination } from "../../../../components/Pagination";
import { Helmet } from "react-helmet";
export const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState();
  const dispatch = useDispatch();
  const { top16Quote } = useSelector((state) => state.quote);
  useEffect(() => {
    fecthData();
  }, [currentPage, currentCategory, dispatch]);

  const fecthData = () => {
    dispatch(
      quoteThunk.getTop16Quotes({
        page: currentPage,
        category: currentCategory,
      })
    );
  };

  const handlePageChange = (page, event) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const handleCategoryChange = (categoryId, event) => {
    event.preventDefault();
    setCurrentCategory(categoryId);
  };

  return (
    <>
      <Helmet>
        <title>Danh sách yêu cầu báo giá</title>
        <meta name="description" content="Tìm kiếm yêu cầu báo giá" />
      </Helmet>
      <main className="quote-list">
        <Container>
          <Row>
            <Col xs={12}>
              <Header></Header>
            </Col>
            <Col xs={12}>
              <div className="d-flex justify-content-center ">
                <Categories
                  OnClick={handleCategoryChange}
                  categoryActive={currentCategory}
                ></Categories>
              </div>
            </Col>
            <Col xs={12}>
              <Row className="gy-3">
                {top16Quote?.items?.map((quote) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={quote.id}>
                    <QuoteItem quote={quote} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={12}>
              <MyPagination
                Meta={top16Quote?.meta}
                position="center"
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
