import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  EmailShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MessageCircle,
  MessageSquare,
  Twitter,
  Users,
  ThumbsUp,
  Check,
  Copy,
} from "react-feather";
import { message } from "antd";
import { IPool } from "../../type";
import { getSinglePool } from "../../server/pools";
import Loading from "../../components/Loading";
import Button from "../../library/Button";
import Layout from "../../components/Layout";

const InviteToPool = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const [copied, setCopied] = useState(false);

  const { data, isLoading } = useQuery<IPool>(["single-pool", id], () =>
    getSinglePool(id || ""),
  );

  const poolCode = data?.config?.code || "";
  const shareUrl = `${window.location.origin}/pool-detail/${name}/${id}`;
  const shareTitle = `Join my Fantasy Predict pool: ${name}`;
  const shareBody = `Hey! Join my Fantasy Predict pool "${name}". Use code ${poolCode} or click: ${shareUrl}`;

  const poolCodeDisplay = poolCode
    .toUpperCase()
    .split("")
    .join(" ");

  const handleSharePool = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareBody, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareBody);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        message.success("Pool link copied to clipboard!");
      } catch {
        message.error("Could not copy to clipboard.");
      }
    }
  };

  const handleSMS = () => {
    window.open(`sms:?body=${encodeURIComponent(shareBody)}`);
  };

  const handleReunite = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      message.success("Pool link copied — paste it to invite old pool members!");
    } catch {
      message.info("Share link: " + shareUrl);
    }
  };

  const handleFrequentMates = async () => {
    try {
      await navigator.clipboard.writeText(shareBody);
      message.success("Invite message copied — send it to your frequent pool mates!");
    } catch {
      message.info(shareBody);
    }
  };

  return (
    <Layout>
      {/* Body */}
      <div className="max-w-lg mx-auto py-6 pb-20">
        {isLoading ? (
          <div className="mt-10">
            <Loading />
          </div>
        ) : (
          <>
            {/* Pool code card */}
            <div className="bg-white rounded-xl p-6 mb-4 shadow-sm text-center">
              <p className="text-gray-700 mb-5 leading-relaxed">
                Your <strong>pool code</strong> makes it easy to find your pool:
              </p>
              <div className="border border-gray-200 rounded-lg py-5 mb-5">
                {poolCode ? (
                  <p className="text-3xl sm:text-4xl font-bold tracking-[0.25em] text-teal-500 select-all">
                    {poolCodeDisplay}
                  </p>
                ) : (
                  <p className="text-gray-400 italic text-sm">No pool code assigned</p>
                )}
              </div>
              {poolCode && (
                <button
                  onClick={handleSharePool}
                  className="inline-flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 mb-4"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy code"}
                </button>
              )}
              <p className="text-gray-500 text-sm leading-relaxed">
                Shout it from the rooftops, out your car window or across the train
                platform... or avoid strange looks by inviting people with these handy
                tools:
              </p>
            </div>

            {/* Android notice + Share Pool button */}
            {/* <div className="bg-white rounded-xl p-6 mb-4 shadow-sm text-center">
              <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                Please note that some of the tools below are not currently working
                for some Android users.
              </p>
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                If you experience trouble, use this button to open a browser on a
                page which will give you an easy copy and paste tool for sharing
                your pool:
              </p>
              <Button onClick={handleSharePool} className="uppercase tracking-widest font-bold">
                {copied ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} /> Copied!
                  </span>
                ) : (
                  "Share Pool"
                )}
              </Button>
            </div> */}

            {/* Share options */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100">
              {/* Email */}
              <EmailShareButton
                url={shareUrl}
                subject={shareTitle}
                body={`${shareBody}\n\n`}
                className="!w-full !block"
              >
                <ShareRow icon={<Mail size={22} className="text-gray-600" />} label="Email" />
              </EmailShareButton>

              {/* WhatsApp */}
              <WhatsappShareButton
                url={shareUrl}
                title={shareBody}
                className="!w-full !block"
              >
                <ShareRow
                  icon={<MessageCircle size={22} className="text-gray-600" />}
                  label="WhatsApp"
                />
              </WhatsappShareButton>

              {/* SMS */}
              <div onClick={handleSMS} className="cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <ShareRow icon={<MessageSquare size={22} className="text-gray-600" />} label="SMS / Text" />
              </div>

              {/* Twitter */}
              <TwitterShareButton
                url={shareUrl}
                title={shareBody}
                className="!w-full !block"
              >
                <ShareRow icon={<Twitter size={22} className="text-gray-600" />} label="Twitter" />
              </TwitterShareButton>

              {/* Reunite an old pool */}
              <div onClick={handleReunite} className="cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <ShareRow icon={<Users size={22} className="text-gray-600" />} label="Reunite an old pool" />
              </div>

              {/* Frequent pool mates */}
              <div onClick={handleFrequentMates} className="cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <ShareRow icon={<ThumbsUp size={22} className="text-gray-600" />} label="Frequent pool mates" />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

type ShareRowProps = {
  icon: React.ReactNode;
  label: string;
};

const ShareRow = ({ icon, label }: ShareRowProps) => (
  <div className="flex items-center justify-between px-5 py-4">
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-gray-800 text-base">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-400" />
  </div>
);

export default InviteToPool;
