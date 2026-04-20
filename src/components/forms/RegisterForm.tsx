import { useMutation } from "react-query";
import { Form, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


import { createAccount } from "../../server/user";
import { saveCustomerDetails } from "../../utils/shared";

import Input from "../../library/Input";
import Button from "../../library/Button";


const RegisterForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const mutation = useMutation(createAccount, {
    retry: false,
    onSuccess: (data) => {
      navigate("/verify-account");
      saveCustomerDetails(data.data);
    },
  });

  const onFinish = (values: Record<string, string>) => {
    const data = {
      ...values,
      email: email.toLowerCase(),
      phoneNumber,
      password,
      username,
    };

    mutation.mutateAsync(data);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <p className="text-red-600 text-sm text-center font-bold mb-1">
          {mutation.error.message}
        </p>
      )}
      <div className="flex gap-5">
        <Form.Item
          name="firstName"
          label={<p className="font-normal">First Name</p>}
          rules={[{ required: true, message: "Enter First Name" }]}
        >
          <Input autoComplete="no" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={<p className="font-normal">Last Name</p>}
          rules={[{ required: true, message: "Enter Last Name" }]}
        >
          <Input autoComplete="no" />
        </Form.Item>
      </div>

      <div className="flex gap-5 w-full">
        <Form.Item
          name="username"
          label={<p className="font-normal">Username</p>}
          rules={[{ required: true, message: "Enter username" }]}
          className="w-full"
        >
          <Input
            autoComplete="no"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label={<p className="font-normal">Gender</p>}
          rules={[{ required: true, message: "Select Gender" }]}
          className="w-full h-[40px]"
        >
          <Select placeholder="Select Gender" className="">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="unspecified">Prefer Not to Say</Select.Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        name="email"
        label={<p className="font-normal">Email</p>}
        rules={[
          { type: "email", message: "Enter a valid email" },
          { required: true, message: "Enter email address" },
        ]}
      >
        <Input autoComplete="no" onChange={(e) => setEmail(e.target.value)} />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label={<p className="font-normal">Mobile Number</p>}
      >
          <Input
            inputMode="numeric"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="font-normal">Password</p>}
        rules={[{ required: true, message: "Enter password" }]}
      >
        <Input
          autoComplete="no"
          Password
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Button
        loading={mutation.isLoading}
        color="orange"
        block
        htmlType="submit"
      >
        Continue
      </Button>
    </Form>
  );
};

export default RegisterForm;
