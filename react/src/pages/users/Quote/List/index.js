import { Header } from "./header";
import { Col, Container, Row } from "react-bootstrap";
import "./quoteList.scss";
import { Categories } from "../../../../components/Categories";
import { QuoteItem } from "./cardQuote";
export const List = () => {
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
                <Col xs={12} xl={3}>
                  <QuoteItem></QuoteItem>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
