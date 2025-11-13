/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Form } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";
import { updateProfile } from "../../server/user";
import { saveCustomerDetails } from "../../utils/shared";
import { IUser } from "../../type";

type Props = {
  info: Partial<IUser>;
};

const EditPersonalInfo = ({ info }: Props) => {
  const [success, setSuccess] = useState("");

  const mutation = useMutation(updateProfile, {
    onSuccess: (data) => {
      saveCustomerDetails(data);
      setSuccess("Information saved");
    },
  });

  const onFinish = (values: Record<string, string>) => {
    mutation.mutateAsync({
      ...values,
    });
  };

  return (
    <Form onFinish={onFinish}>
      {Object.keys(info || {})
        .filter(
          (rec) =>
            ![
              "_id",
              "dateOfBirth",
              "countryCode",
              "isActive",
              "sendNotification",
              "deletedAt",
              "createdAt",
              "verifiedAt",
              "updatedAt",
            ].includes(rec)
        )
        .map((record) => (
          <div className="flex flex-col gap-1" key={record}>
            <p className="text-black font-bold capitalize">
              {record === "dateOfBirth" ? "DOB" : record}
            </p>
            <div>
              <Form.Item name={record} className="">
                <Input
                  color="outline"
                  disabled={record === "email"}
                  className="br-b-2"
                  placeholder="Type here"
                  defaultValue={
                    // @ts-ignore
                    info[record]
                  }
                />
              </Form.Item>
            </div>
          </div>
        ))}

      {success && (
        <p className="text-black text-center font-bold my-3">{success}</p>
      )}
      {mutation.error instanceof Error && (
        <div className="my-3 text-center">
          <ServerError message={mutation.error.message} />
        </div>
      )}
      <Button
        color="black"
        className="flex items-center justify-center"
        htmlType="submit"
        loading={mutation.isLoading}
      >
        {mutation.isLoading ? (
          <p className="animate-pulse">Saving...</p>
        ) : (
          <p>Save</p>
        )}
      </Button>
    </Form>
  );
};

export default EditPersonalInfo;
