import { Table } from "antd";
import Layout from "../../components/Layout";
import Button from "../../library/Button";
import { walletColumn } from "../../components/columns/wallet-column";
import { currencyFormatter } from "../../utils/shared";
import { useQuery } from "react-query";
import {
  getTransactions,
  getWallet,
} from "../../server/wallet";
import Loading from "../../components/Loading";
import useAppStore from "../../utils/appStore";
import FundAccountModal from "../../components/modals/FundAccount";
import WithdrawFundModal from "../../components/modals/WithdrawFund";

const Wallet = () => {
  const { data, isLoading } = useQuery("wallet", getWallet);
  const { data: transData, isFetching } = useQuery(
    "transactions",
    getTransactions
  );

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="border-[1px] rounded-2xl bg-blue-800 p-5">
            <p className="text-white text-lg">Wallet</p>
            <p className="text-center text-white text-3xl p-7">
              {currencyFormatter(data?.balance || 0, data?.currency || "NGN")}
            </p>
          </div>

          <div className="flex gap-10 mt-10 px-5">
            <Button
              onClick={() =>
                useAppStore.setState({
                  modal: { open: true, type: "fundAccount" },
                })
              }
            >
              Fund Account
            </Button>
            <Button
              color="danger"
              onClick={() =>
                useAppStore.setState({
                  modal: { open: true, type: "withdraw" },
                })
              }
            >
              Withdraw
            </Button>
          </div>

          <Table
            className="mt-10"
            loading={isFetching}
            columns={walletColumn}
            dataSource={transData?.docs || []}
          />
        </div>
      )}

      <FundAccountModal />
      <WithdrawFundModal />
    </Layout>
  );
};

export default Wallet;
