import { useQuery } from "react-query";
import { getPoolMembers } from "../../server/pools";
import { Table } from "antd";
import {
  pendingInvitationColumn,
} from "../columns/wallet-column";

type Props = {
  _id: string;
};

const AwaitingResponse = ({ _id }: Props) => {
  const { data, isFetching } = useQuery("pool-members", () =>
    getPoolMembers(String(_id), String("pending"))
  );

  return (
    <Table
      className="mt-1"
      loading={isFetching}
      columns={pendingInvitationColumn}
      dataSource={data || []}
    />
  );
};

export default AwaitingResponse;
