import { Modal } from "antd";
import useAppStore from "../../utils/appStore";
import JoinContestForm from "../forms/JoinContest";

const JoinContest = () => {
  const modalOpen = useAppStore((state) => state.modal);

  return (
    <Modal
      title="Join Pool"
      open={modalOpen.open && modalOpen.type === "join-contest"}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <div className="mt-5">
        <JoinContestForm />
      </div>
    </Modal>
  );
};

export default JoinContest;
