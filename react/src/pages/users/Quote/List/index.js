import { Header } from "./header";
import { Col, Container, Row } from "react-bootstrap";
import "./quoteList.scss";
import { Categories } from "../../../../components/Categories";
import { QuoteItem } from "./cardQuote";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quoteThunk } from "../../../../redux-slice/quote/thunk";
import { MyPagination } from "../../../../components/Pagination";
export const List = () => {
  const { currentPage, setCurrentPage } = useState(1);
  const dispatch = useDispatch();
  const { top16Quote } = useSelector((state) => state.quote);
  useEffect(() => {
    fecthData();
  }, [currentPage, dispatch]);
  const fecthData = async () => {
    await dispatch(quoteThunk.getTop16Quotes({ page: currentPage }));
  };
  const handlePageChange = (page, event) => {
    event.preventdefault();
    setCurrentPage(page);
  };
  return (
    <>
      <main className="quote-list">
        <Container>
          <Row>
            <Col xs={12}>
              <Header></Header>
            </Col>
            <Col xs={12}>
              <div className="d-flex justify-content-center ">
                <Categories></Categories>
              </div>
            </Col>
            <Col xs={12}>
              <Row>
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
