import { Modal } from "antd"
import useAppStore from "../../utils/appStore";
import { IPool } from "../../type";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { invitationContent } from "../../utils/static";

type Props = {
    pool: IPool
}

const InvitePlayers = ({ pool }: Props) => {
      const modalOpen = useAppStore((state) => state.modal);
    
  return (
    <Modal
      title="Invite Players"
      open={modalOpen.open && modalOpen.type === pool._id}
      footer={null}
      onCancel={() =>
        useAppStore.setState({ modal: { open: false, type: "" } })
      }
      className="bg-[#]"
    >
      <p className="text-center mt-5">Your pool code makes it easy to find your pool.</p>

      <div className="bg-[#928f8f] text-lg rounded-lg text-black font-bold mt-3 p-3 text-center">
        <p>{pool?.config?.code}</p>
      </div>

      <p className="mt-5 text-center">Shout it from the rooftops, out of your car window or across the train platform... or avoid strange looks by inviting people via these handy tools:</p>

      <div className="flex justify-center items-center">
        <div className="mt-5 flex gap-5">
          <FacebookShareButton {...invitationContent(pool?.config?.code || '')["facebook"]}>
            <FacebookIcon round size={50} />
          </FacebookShareButton>

          <LinkedinShareButton {...invitationContent(pool?.config?.code || '')["linkedin"]}>
            <LinkedinIcon round size={50} />
          </LinkedinShareButton>

          <TwitterShareButton {...invitationContent(pool?.config?.code || '')["twitter"]}>
            <TwitterIcon round size={50} />
          </TwitterShareButton>

          <WhatsappShareButton {...invitationContent(pool?.config?.code || '')["whatsapp"]}>
            <WhatsappIcon round size={50} />
          </WhatsappShareButton>
        </div>
      </div>

    </Modal>
  )
}

export default InvitePlayers
