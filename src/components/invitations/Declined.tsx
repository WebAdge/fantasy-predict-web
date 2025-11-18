import { useQuery } from "react-query";
import { getPoolMembers } from "../../server/pools";
import { Table } from "antd";
import {
    invitationColumn,  
} from "../columns/wallet-column";

type Props = {
  _id: string;
};

const Declined = ({ _id }: Props) => {
  const { data, isFetching } = useQuery("pool-members", () =>
    getPoolMembers(String(_id), String("declined"))
  );

  return (
    <Table
      className="mt-1"
      loading={isFetching}
      columns={invitationColumn}
      dataSource={data || []}
    />
  );
};

export default Declined;
