import { Modal, Select } from "antd";
import useAppStore from "../../utils/appStore";
import Input from "../../library/Input";
import { useState } from "react";
import Button from "../../library/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchBanks,
  getAccount,
  processWithdrawal,
  verifyBank,
} from "../../server/bank";
import Loading from "../Loading";
import { IBank, IBankList } from "../../type";

const WithdrawFundModal = () => {
  const queryClient = useQueryClient();
  const modalOpen = useAppStore((state) => state.modal);

  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [disable, setDisable] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const [accountName, setAccountName] = useState("");

  const { data, isLoading } = useQuery<IBank>("bank-account", getAccount);
  const { data: bankData, isLoading: bankLoading } = useQuery<IBankList[]>(
    "banks",
    () => fetchBanks("")
  );

  const verifyMutation = useMutation(verifyBank, {
    onSuccess: (data) => {
      setShowAmount(true);
      setAccountName(data?.account_name || "");
    },
  });

  const mutation = useMutation(processWithdrawal, {
    onSuccess: () => {
      queryClient.invalidateQueries("wallet");
      queryClient.invalidateQueries("bank-account");
      setShowAmount(false);
      setAccountNumber("");
      setAccountName("");
      setSelectedBank("");
      useAppStore.setState({ modal: { open: false, type: "" } });
    },
  });

  const onVerifyAccount = () => {
    if (accountNumber.length !== 10) {
      return;
    }

    if (!selectedBank) {
      return;
    }

    setDisable(true);
    verifyMutation.mutate({
      accountNumber,
      bankCode: selectedBank || "",
    });
  };

  const onFinish = () => {
    if (Number(amount) <= 0) {
      return;
    }

    const bank = bankData?.find((d) => d.code === selectedBank);

    const values = {
      accountNumber,
      bankCode: selectedBank,
      accountName,
      bankName: bank?.name || "",
      amount: Number(amount),
    };

    mutation.mutate(values);
  };

  return (
    <Modal
      title="Withdraw"
      open={modalOpen.open && modalOpen.type === "withdraw"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!data ? (
            <>
              <Select
                placeholder="Select your bank"
                loading={bankLoading}
                className="w-full"
                showSearch
                // onSearch={(val) => setName(val)}
                onSelect={(val) => setSelectedBank(val)}
                disabled={disable}
              >
                {bankData?.map((bank: { name: string; code: string }) => (
                  <Select.Option value={bank?.code}>{bank?.name}</Select.Option>
                ))}
              </Select>

              {selectedBank && (
                <Input
                  disabled={disable}
                  placeholder="Account Number"
                  onChange={(val) => setAccountNumber(val.target.value)}
                  className="mt-5"
                  maxLength={10}
                />
              )}
              {accountName && (
                <p className="font-bold text-[15px]">{accountName}</p>
              )}

              {showAmount && (
                <Input
                  type="number"
                  value={amount}
                  onChange={(val) => setAmount(val.target.value)}
                  className="mt-5"
                  placeholder="Enter amount"
                />
              )}

              <Button
                className="mt-5"
                loading={verifyMutation.isLoading || mutation.isLoading}
                onClick={showAmount ? onFinish : onVerifyAccount}
              >
                {showAmount ? "Withdraw" : "Continue"}
              </Button>
            </>
          ) : (
            <>
            <div className="p-2 my-2 bg-[#f7f7f7] rounded-lg">
              <h2>{data.bankName}</h2>
              <p>{data.accountName}</p>
            </div>
              <div>
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
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default WithdrawFundModal;
