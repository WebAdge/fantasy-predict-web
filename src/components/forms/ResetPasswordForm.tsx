import { Form } from "antd";
import { useMutation } from "react-query";
import { RuleObject } from "antd/es/form";
import { useNavigate } from "react-router-dom";

import { getData } from "../../utils/shared";
import { resetPassword } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { IUser } from "../../type";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation(resetPassword, {
    retry: false,
    onSuccess: () => {
      navigate("/login?reset=successful");
    },
  });

  const validatePassword = (_: RuleObject, value: string) => {
    // Password should have at least 1 special character, 1 number, and minimum 8 characters
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject("Your password is not strong enough.");
    }
    return Promise.resolve();
  };

  const onFinish = (values: Pick<IUser, "email" | "otp" | "password">) => {
    mutation.mutate({
      ...values,
      email: String(getData("plps-01")),
    });
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="otp"
        label={<p className="navy-color">OTP</p>}
        rules={[{ required: true, message: "Enter a valid otp" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="navy-color">New Password</p>}
        rules={[
          { required: true, message: "Enter password" },
          { validator: validatePassword },
        ]}
      >
        <Input type="password" color="outline" />
      </Form.Item>
      <p className="navy-color text-xs -mt-4">
        Use at least 8 characters with 1 number and one special character
      </p>

      <Form.Item>
        <Button
          className="mt-5"
          block
          htmlType="submit"
          loading={mutation.isLoading}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
