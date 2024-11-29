import { Header } from "./header";
import { Col, Container, Row } from "react-bootstrap";
import "./quoteList.scss";
import { Categories } from "../../../../components/Categories";
import { QuoteItem } from "./quoteItem";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quoteThunk } from "../../../../redux-slice/quote/thunk";
import { MyPagination } from "../../../../components/Pagination";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { QuoteItemSkeleton } from "./QuoteItemSkeleton";
const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParms = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(queryParms.get("page") || 1);
  const [currentCategory, setCurrentCategory] = useState(
    queryParms.get("category")
  );
  const [loading, setLoading] = useState(true);
  const { top16Quote } = useSelector((state) => state.quote);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      const queryParms = new URLSearchParams(location.search);
      const page = queryParms.get("page") || 1;
      const category = queryParms.get("category");
      setCurrentPage(page);
      setCurrentCategory(category);
      dispatch(
        quoteThunk.getTop16Quotes({
          page,
          category,
        })
      );
      setLoading(false);
    }, 1000);
  }, [dispatch, location.search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback((page, event) => {
    event.preventDefault();
    setCurrentPage(page);
    fetchDataByURL(page, currentCategory);
  }, []);

  const handleCategoryChange = (categoryId, event) => {
    event.preventDefault();
    setCurrentCategory(categoryId);
    fetchDataByURL(currentPage, categoryId);
  };

  const fetchDataByURL = useCallback(  (page, category) => {
    const query = new URLSearchParams();
    page && query.append("page", page);
    category && query.append("category", category);
    navigate(`/quote?${query.toString()}`);
  },[navigate])

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
                {loading
                  ? Array.from({ length: 16 }).map((_, index) => (
                      <Col xs={12} md={6} lg={4} xl={3} key={index}>
                        <QuoteItemSkeleton />
                      </Col>
                    ))
                  : top16Quote?.items?.map((quote) => (
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
export default List;
