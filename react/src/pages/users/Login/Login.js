import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { authThunk } from "../../../redux-slice/auth/thunk";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useState } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const result = await dispatch(authThunk.loginUser(data));
    if (authThunk.loginUser.fulfilled.match(result)) {
      navigate("/");
    } else {
      setError(result.payload || "Tài khoản hoặc mật khẩu không chính xác")
    };
  };
  return (
    <>
    {error && (
      <Alert variant="danger" onClose={() => setError('')} dismissible>
        {error}
      </Alert>
    )}
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true })} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" {...register("password", { required: true })} />
        {errors.password && <Form.Text className="text-muted">{errors.password.message}</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
};
