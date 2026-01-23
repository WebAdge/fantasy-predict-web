/* eslint-disable @typescript-eslint/no-explicit-any */


export const leaderboardColumn = (isFree: boolean) => [
  {
    title: "Player",
    key: "username",
    dataIndex: "username",
    render: (_value: string, data: any) => (
      <p className="font-bold">
        {data?.user?.username ||
          `${data.user?.firstName} ${data.user?.lastName}`}
      </p>
    ),
  },
  {
    title: "Cls",
    key: "Cls",
    dataIndex: "Cls",
  },
  {
    title: "Exact",
    key: "Exact",
    dataIndex: "Exact",
  },
  {
    title: "Slam",
    key: "Slam",
    dataIndex: "Slam",
  },
  {
    title: "Pts",
    key: "Total",
    dataIndex: "Total",
  },
  {
    ...(!isFree && {
      title: "Amt",
      dataIndex: "amount",
      key: "amount",
      render: (value: string) => (
        <>₦ {Number(value || 0).toLocaleString()}</>
      ),
    }),
  },
];
