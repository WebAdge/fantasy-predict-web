import { currencyFormatter } from "../../utils/shared";

export const leaderboardColumn = (isFree: boolean) => [
    {
        title: "Username",
        key: "username",
        dataIndex: "username",
    },
    {
        title: "Points",
        render: (_value: string, record: any) => (
            <>
                {record.predictions?.totalPoints}
            </>
        )
    },
    {
        ...(!isFree && {
            title: "Amount Qualified",
            dataIndex: "amount",
            key: "amount",
            render: (value: string) => (
                <>
                    {currencyFormatter(Number(value || 0), "NGN")}
                </>
            )
        })
    },
];