// form.jsx
import { Row, Col } from "react-bootstrap";
import { InputItem } from "../../../../components/Form/form";
import { Controller } from "react-hook-form";

export const FormFiled = ({ filedForm, control, errors }) => {
  return (
    <Row className="gy-3">
      {filedForm.map((field, index) => (
        <Col key={`${field.name}-${index}`} {...field.cols}>
          <Controller
            name={field.name}
            control={control}
            rules={{
              required: field.isRequired && `${field.label} là bắt buộc`,
            }}
            render={({ field: { onChange, value } }) => (
              <InputItem
                {...field}
                onChange={onChange}
                value={value || ""} // Ensure value is never undefined
                error={errors[field.name]?.message}
              />
            )}
          />
        </Col>
      ))}
    </Row>
  );
};
