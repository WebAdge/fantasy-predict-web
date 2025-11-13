import { Form } from "antd";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "../../server/user";
import { saveCustomerDetails } from "../../utils/shared";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { IUser } from "../../type";

const LoginForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation(login, {
    retry: false,
    onSuccess: (data) => {
      saveCustomerDetails(data);
      navigate("/dashboard");
    },
  });

  const onFinish = (values: Pick<IUser, "email" | "password">) => {
    mutation.mutate(values);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="to"
        label={<p className="navy-color">Email Address or Username</p>}
        rules={[
          { required: true, message: "Enter a valid email or username" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="navy-color">Password</p>}
        rules={[{ required: true, message: "Enter password" }]}
      >
        <Input type="password" Password={true} />
      </Form.Item>

      <Form.Item>
        <Button
          block
          htmlType="submit"
          color="orange"
          loading={mutation.isLoading}
        >
          Login
        </Button>
      </Form.Item>

      <p
        className="navy-color text-center cursor-pointer"
        onClick={() => navigate("/forget-password")}
      >
        Forget Password? Reset it
      </p>
    </Form>
  );
};

export default LoginForm;
