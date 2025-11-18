import { Tag } from "antd";
import { format } from "date-fns";
import { currencyFormatter } from "../../utils/shared";
import Button from "../../library/Button";

export const walletColumn = [
  // {
  // 	title: "Reference",
  // 	dataIndex: "reference",
  // 	key: "reference"
  // },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    render: (value: string) => (
      <>{currencyFormatter(Number(value || 0), "NGN")}</>
    ),
  },
  {
    title: "Type",
    key: "type",
    dataIndex: "type",
    render: (value: string) => (
      <>
        {value === "credit" ? (
          <Tag color="success">Deposit</Tag>
        ) : (
          <Tag color="error">Withdraw</Tag>
        )}
      </>
    ),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (value: string) => (
      <>
        {value === "successful" ? (
          <Tag color="success">{value}</Tag>
        ) : value === "pending" ? (
          <Tag color="cyan">{value}</Tag>
        ) : (
          <Tag color="error">{value}</Tag>
        )}
      </>
    ),
  },
  {
    title: "Date",
    key: "createdAt",
    dataIndex: "createdAt",
    render: (value: string) => (
      <>{format(new Date(value), "dd-MM-yyyy")}</>
    ),
  },
];

export const pendingInvitationColumn = [
  {
    title: "Name",
    key: "name",
    render: (_value: string, record: any) => (
      <>{record.firstName} {record.lastName}</>
    ),
  },
  {
    title: "Action",
    key: "createdAt",
    render: () => (
      <div className="flex gap-5">
      <Button>Accept</Button>
      <Button>Decline</Button>
      </div>
    ),
  },
];

export const invitationColumn = [
  {
    title: "Name",
    key: "name",
    render: (_value: string, record: any) => (
      <>{record.firstName} {record.lastName}</>
    ),
  },
];
