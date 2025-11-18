import { Modal, Tabs } from "antd";
import useAppStore from "../../utils/appStore";
import { IPool } from "../../type";
import Accepted from "../invitations/Accepted";
import Declined from "../invitations/Declined";

type Props = {
  pool: IPool;
};

const CheckInviteStatus = ({ pool }: Props) => {
  const modalOpen = useAppStore((state) => state.modal);

  const items = [
    // {
    //   key: "1",
    //   label: "Awaiting Response",
    //   children: <AwaitingResponse _id={String(pool._id)} />,
    // },
    {
      key: "2",
      label: "Joined",
      children: <Accepted _id={String(pool._id)} />,
    },
    {
      key: "3",
      label: "Declined",
      children: <Declined _id={String(pool._id)} />,
    },
  ];

  return (
    <Modal
      title="Invite Players"
      open={modalOpen.open && modalOpen.type === "check-invitation"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <p className="text-center mt-5">
        Please note that invitations{" "}
        <span className="font-bold">older than 3 months</span> are normally
        deleted from Fantasy Predict and may not appear below.
      </p>
      <Tabs defaultActiveKey="1" items={items} />
    </Modal>
  );
};

export default CheckInviteStatus;
