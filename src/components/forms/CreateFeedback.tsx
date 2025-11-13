import { Form } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { addFeedback } from "../../server/user";
import useAppStore from "../../utils/appStore";

const CreateFeedback = () => {
  const [success, setSuccess] = useState("");
  const mutation = useMutation(addFeedback, {
    onSuccess: () => {
      setSuccess("Feedback updated");
      useAppStore.setState({ modal: { open: false, type: "" } })
    },
  });

  const onFinish = (values: { feedback: string }) => {
    mutation.mutateAsync({
      message: values.feedback,
    });
  };

  return (
    <Form onFinish={onFinish}>
      {success && (
        <p className="text-black text-center font-bold my-3">{success}</p>
      )}
      {mutation.error instanceof Error && (
        <div className="my-3 text-center">
          <ServerError message={mutation.error.message} />
        </div>
      )}
      <Form.Item name="feedback">
        <Input textarea color="outline" placeholder="Type here" />
      </Form.Item>

      <Button
        color="default"
        className="flex items-center justify-center"
        htmlType="submit"
        loading={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <p className="animate-pulse">Submiting...</p>
        ) : (
          <p>Submit feedback</p>
        )}
      </Button>
    </Form>
  );
};

export default CreateFeedback;
