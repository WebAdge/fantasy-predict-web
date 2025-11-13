import { instance, next } from "./base";

export const getAccount = async () => {
  const { data } = await instance()
    .get("/v1/banks/account")
    .catch((e) => next(e));
  return data?.data;
};

export const fetchBanks = async (bankName: string) => {
  const { data } = await instance()
    .get("/v1/banks", { params: { ...(bankName && { name: bankName }) } })
    .catch((e) => next(e));
  return data?.data;
};

export const verifyBank = async (values: {
  accountNumber: string;
  bankCode: string;
}) => {
  const { data } = await instance()
    .post("/v1/banks/verify-account", values)
    .catch((e) => next(e));
  return data?.data;
};

export const processWithdrawal = async (values: {
  accountNumber: string;
  bankCode: string;
  accountName: string;
  bankName: string;
}) => {
  const { data } = await instance()
    .post("/v1/withdrawals", values)
    .catch((e) => next(e));
  return data?.data;
};
