import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import Input from "../../library/Input";
import { useState } from "react";
import Button from "../../library/Button";
import { getCustomerDetails } from "../../utils/shared";

const FundAccountModal = () => {
  const customer = getCustomerDetails();
  const modalOpen = useAppStore((state) => state.modal);

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const onFinish = () => {
    setError("");
    if (Number(amount) <= 0) {
      return;
    }
    window.open(`${import.meta.env.VITE_BACKEND_URL}/v1/wallets/pay?email=${encodeURIComponent(customer.email as string)}&amount=${amount}`, '_blank');
  };

  return (
    <Modal
      title="Fund Account"
      open={modalOpen.open && modalOpen.type === "fundAccount"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <p className="text-red-600 text-center italic">{error}</p>
      <p className="text-left font-bold">Enter amount</p>
      <div className="flex flex-col justify-center items-center mt-3">
        <Input
          type="number"
          value={amount}
          onChange={(val) => setAmount(val.target.value)}
        />

        <Button className="mt-8" onClick={onFinish}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default FundAccountModal;
