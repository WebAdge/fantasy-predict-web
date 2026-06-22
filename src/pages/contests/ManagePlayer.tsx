import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Drawer, Modal, message } from "antd";
import { ThumbsUp } from "react-feather";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import {
  fetchPoolMembers,
  expelMember,
  updateMemberStatus,
} from "../../server/pools";

type PopulatedMember = {
  _id: string;
  pool: string;
  status: "active" | "pending" | "expelled";
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email?: string;
  };
};

const displayName = (member: PopulatedMember) => {
  const { firstName, lastName, username } = member.user;
  const full =
    lastName && firstName
      ? `${lastName}, ${firstName}`
      : firstName || lastName || username;
  return username ? `${full} (${username})` : full;
};

const sectionKey = (member: PopulatedMember) =>
  (member.user.lastName || member.user.firstName || member.user.username)
    .charAt(0)
    .toUpperCase();

const groupAlphabetically = (
  members: PopulatedMember[],
): [string, PopulatedMember[]][] => {
  const sorted = [...members].sort((a, b) =>
    (a.user.lastName || a.user.firstName).localeCompare(
      b.user.lastName || b.user.firstName,
    ),
  );
  const map = new Map<string, PopulatedMember[]>();
  for (const m of sorted) {
    const key = sectionKey(m);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
};

const ManagePlayer = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<PopulatedMember | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { data: members = [], isLoading } = useQuery<PopulatedMember[]>(
    ["pool-members", id],
    () => fetchPoolMembers(id || ""),
    { enabled: !!id },
  );

  const expelMutation = useMutation(expelMember, {
    onSuccess: () => {
queryClient.invalidateQueries(["pool-members", id]);
        setSelected(null);
        message.success("Player expelled from pool.");
    }, 
    onError: (e: Error) => {
message.error(e.message)
    }
  })

  const pendingMutation = useMutation(updateMemberStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(["pool-members", id]);
        setSelected(null);
        message.success("Player status set to pending approval.");
    },
    onError: (e: Error) => {
message.error(e.message)
    }
  });

  const grouped = groupAlphabetically(members);
  const letters = grouped.map(([letter]) => letter);

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`section-${letter}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const confirmExpel = () => {
    if (!selected) return;
    Modal.confirm({
      title: `Expel ${selected.user.username || selected.user.firstName}?`,
      content: "This will remove the player from your pool. This action cannot be undone.",
      okText: "Expel",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => expelMutation.mutate({ memberId: selected._id }),
    });
  };

  const confirmPending = () => {
    if (!selected) return;
    Modal.confirm({
      title: "Set to pending approval?",
      content: `${selected.user.username || selected.user.firstName} will need to be re-approved to participate.`,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => pendingMutation.mutate({ memberId: selected._id, status: 'pending' }),
    });
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto pb-24 relative" ref={listRef}>
        {isLoading ? (
          <div className="mt-10">
            <Loading />
          </div>
        ) : (
          <>
            {/* Summary banner */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <p className="text-gray-800 leading-relaxed mb-3">
                <strong>{members.length} player{members.length !== 1 ? "s" : ""}</strong>{" "}
                are participating in{" "}
                <span className="font-semibold capitalize">{name}</span> under
                your wise, fair and charming leadership.
              </p>
              <button
                onClick={() => navigate(`/pool-invite/${name}/${id}`)}
                className="flex items-center gap-2 text-pink-500 text-sm font-medium active:scale-95 transition-transform"
              >
                <ThumbsUp size={16} />
                <span>Tap players to see profiles or change status</span>
              </button>
            </div>

            {/* Alphabetical list */}
            {members.length === 0 ? (
              <div className="text-center text-gray-400 mt-16">
                <p className="text-lg">No players yet</p>
                <p className="text-sm mt-1">Invite players to join your pool</p>
              </div>
            ) : (
              <div className="relative pr-6">
                {grouped.map(([letter, group]) => (
                  <div key={letter}>
                    <div
                      id={`section-${letter}`}
                      className="px-2 py-1 bg-gray-100 border-b border-gray-200"
                    >
                      <span className="text-gray-500 text-sm font-medium">
                        {letter}
                      </span>
                    </div>
                    {group.map((member, idx) => (
                      <button
                        key={member._id}
                        onClick={() => setSelected(member)}
                        className={`w-full text-left px-3 py-4 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors ${
                          idx < group.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <span className="text-gray-900 text-base">
                          {displayName(member)}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}

                {/* Alphabet scrubber */}
                {letters.length > 0 && (
                  <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0.5">
                    {letters.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => scrollToLetter(letter)}
                        className="text-blue-500 text-xs font-semibold leading-none py-0.5 px-1 hover:text-blue-700 active:scale-110 transition-transform"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Player action sheet */}
      <Drawer
        placement="bottom"
        open={!!selected}
        onClose={() => setSelected(null)}
        height="auto"
        closeIcon={null}
        title={null}
        bodyStyle={{ padding: 0 }}
      >
        {selected && (
          <div className="pb-8 pt-2">
            {/* Handle bar */}
            <div className="flex justify-center pt-2 pb-3">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Player username */}
            <p className="text-center text-gray-500 text-sm pb-3 border-b border-gray-200">
              {selected.user.username || selected.user.firstName}
            </p>

            {/* About this player */}
            <button
              className="w-full text-left px-5 py-4 text-gray-900 text-base border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={() => {
                setSelected(null);
                message.info("Player profile coming soon.");
              }}
            >
              About this player
            </button>

            {/* Pool membership section */}
            <div className="px-5 pt-4 pb-1">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                Pool membership
              </p>
            </div>

            <button
              className="w-full text-left px-5 py-4 text-gray-900 text-base border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={confirmPending}
              disabled={pendingMutation.isLoading}
            >
              Set to pending approval
            </button>

            <button
              className="w-full text-left px-5 py-4 text-gray-900 text-base border-b border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={confirmExpel}
              disabled={expelMutation.isLoading}
            >
              Expel
            </button>

            {/* Cancel */}
            <button
              className="w-full text-left px-5 py-4 text-red-500 text-base font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
              onClick={() => setSelected(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </Drawer>
    </Layout>
  );
};

export default ManagePlayer;
