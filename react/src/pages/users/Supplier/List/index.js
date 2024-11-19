import { Col, Container, Form, Row } from "react-bootstrap";
import "./supplierListSection.scss";
import Image from "../../../../components/Image";
import iconFilter from "../../../../assets/images/icons/filter.svg";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardSupplier } from "../../../../components/CardSupplier";
import { userThunk } from "../../../../redux-slice/user/thunk";
import { MyPagination } from "../../../../components/Pagination";
import { Header } from "./Header";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { top12Supplier } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");
  const page = queryParams.get("page");
  const country = queryParams.get("country");
  const category = queryParams.get("category");
  const [currentPage, setCurrentPage] = useState(page || 1);
  const { register, handSubmit, watch } = useForm({
    defaultValues: {
      search: search || "",
      country: country || "",
      category: category || "",
    },
  });
  const fetchData = useCallback(async () => {
    const { search, country, category } = watch();

    await dispatch(
      userThunk.getTop12Suppliers({
        page: currentPage,
        category,
        country,
        search,
      })
    );
  }, [dispatch, currentPage, watch]);

  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage, fetchData, location.search]);

  const handlePageChange = (page, event) => {
    event?.preventDefault();
    setCurrentPage(page);
    fetchDataByURL("", page);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await fetchDataByURL("submit");
  };

  const countries = [
    { label: "Việt Nam", value: 84 },
    { label: "Hàn Quốc", value: 82 },
    { label: "Lào", value: 856 },
    { label: "Trung Quốc", value: 86 },
  ];

  const fetchDataByURL = (type = "", page) => {
    const queryString = new URLSearchParams(watch()).toString();
    navigate(
      `/supplier?${queryString}&page=${type ? "" : page || currentPage}`
    );
  };

  return (
    <>
      <Helmet>
        <title>Danh sách nhà cung cấp</title>
        <meta name="description" content="Tìm kiếm nhà cung cấp" />
      </Helmet>
      <main>
        <section className="supplierListSection">
          <Container>
            <Row>
              <Col xs={12}>
                <Header />
              </Col>

              <Col xs={12}>
                <Form className="form-search" onSubmit={handSubmit(onSubmit)}>
                  <Row className="gy-3 ">
                    <Col xs={12} md={6} xl={3}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên nhà cung cấp"
                          name="search"
                          {...register("search")}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                      <Form.Select
                        aria-label="Default select example"
                        {...register("category")}
                        name="category"
                      >
                        <option value="">Chọn danh mục</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col xs={12} md={6} xl={3}>
                      <Form.Select
                        aria-label="Default select example"
                        {...register("country")}
                        name="country"
                      >
                        <option value="">Chọn khu vực</option>
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
    </>
  );
};

export default List;
