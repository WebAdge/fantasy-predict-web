import { Form } from "antd";
import { useMutation } from "react-query";

import { changePassword } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { IUser } from "../../type";

const CreateChallengeForm = () => {

  const mutation = useMutation(changePassword, {
    onSuccess: () => {
        console.log({})
    },
  });

  const onFinish = (values: Partial<IUser>) => {
    const data = {
      ...values,
    };
    mutation.mutateAsync(data);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )}
      <Form.Item
        name="oldPassword"
        label={<p className="text-black">Old Password</p>}
        rules={[{ required: true, message: "Enter password" }]}
      >
        <Input type="password" color="outline" />
      </Form.Item>

      <Form.Item
        name="password"
        label={<p className="text-black">New Password</p>}
        rules={[
          { required: true, message: "Enter password" },
        ]}
      >
        <Input type="password" color="outline" />
      </Form.Item>
      <p className="text-black text-xs">
        Use at least 8 characters with 1 number and one special character
      </p>

      <Form.Item>
        <Button
          block
          className="mt-8"
          htmlType="submit"
          loading={mutation.isLoading}
        >
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateChallengeForm;
