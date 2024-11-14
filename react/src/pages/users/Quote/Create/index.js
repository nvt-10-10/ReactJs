// Create.jsx
import { Col, Container, Row } from "react-bootstrap";
import "./createQuote.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { categoryThunk } from "../../../../redux-slice/categories/thunk";
import { formFiled } from "./formField";
import { FormFiled } from "./form";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

export const Create = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [filedForm, setFiledForm] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: [], // Changed from null to [] for multi-select
      quantity: "",
      unit: "",
      price: "",
      price_unit: "", // Changed from null to ""
    },
  });

  useEffect(() => {
    dispatch(categoryThunk.getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      setFiledForm(formFiled(customCategory(categories)));
    }
  }, [categories]);

  const customCategory = (categories) => {
    return categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Tạo yêu cầu báo giá</title>
        <meta name="description" content="Tạo yêu cầu báo giá" />
      </Helmet>
      <main className="create-quote">
        <Container>
          <Row>
            <Col xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xs={12} lg={7}>
                    <FormFiled
                      filedForm={filedForm}
                      control={control}
                      errors={errors}
                    />
                  </Col>
                  <Col xs={12} lg={5}></Col>
                </Row>
                <Col xs={12} className="mt-10">
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </Col>
              </form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
