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
import { FormMedia } from "./formMedia";
import { quoteThunk } from "../../../../redux-slice/quote/thunk";
import ButtonPrimary from "../../../../components/Button";

export const Create = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [filedForm, setFiledForm] = useState([]);

  const {
    setValue,
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

  // const onSubmit = async (data) => {
  //   console.log({ data });

  //   await dispatch(quoteThunk.createQuote(data));
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key]) && key == "category") {
        data[key].forEach((item) => formData.append(`${key}[]`, item));
      } else {
        if (key !== "images") formData.append(key, data[key]);
      }
    });

    data.category.forEach((category) => {
      formData.append("category[]", category);
    });

    if (data.images)
      data.images.forEach((img) => formData.append("images", img));

    await dispatch(quoteThunk.createQuote(formData));
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
                  <Col xs={12} lg={5}>
                    <FormMedia
                      setValue={setValue}
                      control={control}
                    ></FormMedia>
                  </Col>
                </Row>
                <Col xs={12} className="mt-24">
                  <ButtonPrimary
                    type="button"
                    typeButton="submit"
                    text="Gửi yêu cầu"
                  ></ButtonPrimary>
                </Col>
              </form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};
