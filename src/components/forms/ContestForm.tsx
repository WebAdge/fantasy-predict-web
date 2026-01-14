import { Form, Select } from "antd";
import Input from "../../library/Input";
import Button from "../../library/Button";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { ICompetition, IPool } from "../../type";
import { fetchUserCompetition } from "../../server/matches";
import { createPool } from "../../server/pools";


const ContestForm = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<Partial<IPool>>({
    name: "",
    description: "",
    privacy: "public",
    competition: "",
    config: {
            amount: 0,
            paid: false,
        }
  });

  const { data: competitions } = useQuery<ICompetition[]>(
    "competition",
    fetchUserCompetition
  );

  const mutation = useMutation(createPool, {
    onSuccess: () => {
      window.location.href = "/dashboard/pools";
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "An error occurred");
    },
  });

  const onFinish = () => {
    setError("");
    if (step === 2) {
      mutation.mutate({
        ...formData,
        config: {
          ...formData.config,
          amount: formData.config?.amount ? Number(formData.config.amount) : 0,
          paid: formData.config?.amount ? true : false,
        }
      });
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
      {/* {mutation.error instanceof Error && (
        <ServerError message={mutation.error.message} />
      )} */}

      {step === 1 && (
        <div>
          <Form.Item
            name="title"
            label={<p className="text-black font-bold">Title</p>}
            rules={[{ required: true, message: "Enter pool title" }]}
          >
            <Input
              value={formData.name}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, name: val.target.value }))
              }
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<p className="text-black font-bold">Description</p>}
            rules={[{ required: true, message: "Enter pool description" }]}
          >
            <Input
            maxLength={150}
              value={formData.description}
              textarea
              color="outline"
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  description: val.target.value,
                }))
              }
            />
          </Form.Item>
        </div>
      )}

      {step === 2 && (
        <>
          <div className="flex flex-col gap-3">
            <Form.Item
              name="competition"
              label={<p className="text-black font-bold">Competition</p>}
              rules={[{ required: false, message: "Select competition" }]}
            >
              <Select
                placeholder="Select Competition"
                className="w-full"
                value={formData.competition}
                onSelect={(val) =>
                  setFormData((prev) => ({ ...prev, competition: val }))
                }
              >
                {competitions?.map((competition) => (
                  <Select.Option key={competition._id} value={competition._id}>
                    {competition.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="amount"
              label={<p className="text-black font-bold">Amount</p>}
            >
              <Input type="number" min={0} 
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  config: {
                    ...prev.config,
                    amount: Number(val.target.value),
                    paid: val.target.value ? true : false,
                  }
                }))
              }
              />
              <p>If you want others to pay to join, enter amount</p>
            </Form.Item>

            <Form.Item
              name="privacy"
              label={<p className="text-black font-bold">Privacy</p>}
              rules={[{ required: false, message: "Enter privacy" }]}
            >
              <Select
                placeholder="Select Privacy"
                className="w-full capitalize"
                value={formData.privacy}
                onSelect={(val) =>
                  setFormData((prev) => ({ ...prev, privacy: val as "public" | "private" }))
                }
              >
                {['public', 'private']?.map((privy) => (
                  <Select.Option key={privy} value={privy}>
                    {privy}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </>
      )}

      <p className="text-red-800 italic font-bold text-center">{error}</p>
      <div className="flex gap-5">
        {step !== 1 && (
          <Button
            block
            className="mt-8"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}

        <Button
          block
          className="mt-8"
          htmlType="submit"
          color="orange"
          loading={step === 2 && mutation.isLoading}
        >
          {step === 2 ? "Create Pool" : "Continue"}
        </Button>
      </div>
    </Form>
  );
};

export default ContestForm;
