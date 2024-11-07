import { Col, Container, Form, Row } from "react-bootstrap";
import "./supplierListSection.scss";
import Image from "../../../../components/Image/Image";
import iconFilter from "../../../../assets/images/icons/filter.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardSupplier } from "../../../../components/CardSupplier/CardSupplier";
import { userThunk } from "../../../../redux-slice/user/thunk";
import { MyPagination } from "../../../../components/Pagination/Pagination";
import { Header } from "./Header";

const List = () => {
  const { top12Supplier } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const [currentPage, setCurrentPage] = useState(1); // Set default page to 1
  const [formData, setFormData] = useState({
    search: "",
    country: "",
    category: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    // Wrap async function inside useEffect
    const fetchData = async () => {
      const { search, country, category } = formData;
      await dispatch(userThunk.getTop12Suppliers({ currentPage, category, country, search }));
    };

    fetchData();
  }, [currentPage, dispatch, formData]); // Include formData as dependency to re-fetch when form changes
 
  const handlePageChange = async (page, event) => {
    event?.preventDefault();
    setCurrentPage(page);
    await fetchData();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handSubmit = async (event) => {
    event.preventDefault();
    await fetchData();
  };

  const countries = [
    { label: "Việt Nam", value: 84 },
    { label: "Hàn Quốc", value: 82 },
    { label: "Lào", value: 856 },
    { label: "Trung Quốc", value: 86 },
  ];


  const fetchData = async () => {
    const { search, country, category } = formData;
    console.log({ search, country, category,currentPage } );
    await dispatch(userThunk.getTop12Suppliers({ page:currentPage, category, country, search }));
  };


  return (
    <main>
      <section className="supplierListSection">
        <Container>
          <Row>
            <Col xs={12}>
              <Header />
            </Col>

            <Col xs={12}>
              <Form className="form-search" onSubmit={handSubmit}>
                <Row className="gy-3 ">
                  <Col xs={12} md={6} xl={3}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Control
                        type="text"
                        placeholder="Nhập tên nhà cung cấp"
                        name="search"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} xl={3}>
                    <Form.Select aria-label="Default select example" onChange={handleChange} name="category">
                      <option>Chọn danh mục</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={6} xl={3}>
                    <Form.Select aria-label="Default select example" onChange={handleChange} name="country">
                      <option>Chọn khu vực</option>
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col xs={12} md={6} xl={3}>
                    <button className="btn btn-filter">
                      Lọc thông tin <Image src={iconFilter} />
                    </button>
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col xs={12}>
              <Row className="list-supplier gy-4">
                {top12Supplier?.items?.map((supplier) => (
                  <Col xs={12} md={6} lg={4} xl={3} key={supplier.id}>
                    <CardSupplier supplier={supplier} />
                  </Col>
                ))}
              </Row>
            </Col>

            <Col xs={12}>
              <MyPagination
                Meta={top12Supplier?.meta}
                position="center"
                onPageChange={handlePageChange}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default List;
