import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import useAppStore from "../../utils/appStore";
import { joinPoolWithCode } from "../../server/pools";

const JoinContestForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(joinPoolWithCode, {
    onSuccess: () => {
      queryClient.invalidateQueries("contest");
      useAppStore.setState({ modal: { open: false, type: "" } })
    },
  });

  const onFinish = (values: { code: string }) => {
    mutation.mutateAsync(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {mutation.error instanceof Error && (
        <div className="my-3 text-center">
          <ServerError message={mutation.error.message} />
        </div>
      )}
      <Form.Item name="code" label={<p className="font-bold">Enter Invite Code</p>}>
        <Input color="outline" placeholder="Type here" />
      </Form.Item>

      <Button
        color="default"
        className="flex items-center justify-center"
        htmlType="submit"
        loading={mutation.isLoading}
      >
        <p>Join Contest</p>
      </Button>
    </Form>
  );
};

export default JoinContestForm;
