import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { checkTokens, loginUser } from "../../../redux-slice/auth/thunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { getToken } from "../../../utils/authToken";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    } else {
      setError(result.payload || "Tài khoản hoặc mật khẩu không chính xác");
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getToken();
      if (token) {
        const result = await dispatch(checkTokens());
        if (checkTokens.fulfilled.match(result)) {
          navigate("/");
        }
      }
    };

    checkLoginStatus();
  }, [dispatch, navigate]);
  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "Email là bắt buộc" })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", { required: "Mật khẩu là bắt buộc" })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default Login;
