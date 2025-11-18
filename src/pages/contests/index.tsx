/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import Button from "../../library/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IPool } from "../../type";
import { currencyFormatter, getCustomerDetails } from "../../utils/shared";
import Loading from "../../components/Loading";
import Input from "../../library/Input";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import useAppStore from "../../utils/appStore";
import JoinContest from "../../components/modals/JoinContest";
import { fetchPools, joinPool } from "../../server/pools";
import { CheckCircle, MoreVertical, UserPlus } from "react-feather";
import InvitePlayers from "../../components/modals/InvitePlayers";
import CheckInviteStatus from "../../components/modals/CheckInviteStatus";

const Challenges = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const customer = getCustomerDetails();
  const popUpRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [pool, setPool] = useState({});

  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading } = useQuery<IPool[]>(["contest", search], () =>
    fetchPools(search)
  );

  const debouncedSearch = useCallback(
    debounce((val: string) => {
      setSearch(val);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  const onSearch = (val: string) => {
    debouncedSearch(val);
  };

  const mutation = useMutation(joinPool, {
    onSuccess: () => {
      queryClient.invalidateQueries("contest");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleClickOutside = (event: ChangeEvent<HTMLElement>) => {
    if (
      popUpRef.current &&
      // @ts-ignore
      !popUpRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    document.addEventListener("click", handleClickOutside);
    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <div className="flex justify-between">
        <h3 className="text-[22px] leading-[28px] font-bold mb-10">Pools</h3>
        <div className="flex gap-3">
          <Button
            size="small"
            color="primary"
            onClick={() => navigate("/create-contest")}
            className="w-[120px]"
          >
            Join Pool
          </Button>
          <Button
            size="small"
            color="orange"
            onClick={() => navigate("/create-contest")}
            className="w-[120px]"
          >
            Create Pool
          </Button>
        </div>
      </div>

      <div className="my-7">
        <Input
          value={search}
          placeholder="Search by name"
          // placeholder="Search by name or invitation code"
          className="h-[50px]"
          onChange={(val) => onSearch(val.target.value)}
        />
        <p className="text-red-800 italic font-bold text-center">{error}</p>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-10" ref={popUpRef}>
            {data?.map((contest) => (
              <div
                className="rounded-3xl p-5 bg-white my-5 border-[1px] border-gray-200"
                key={contest._id}
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="font-bold text-xl">{contest.name}</h2>
                    <p className="text-xs italic">
                      {contest.config.amount
                        ? `Join with ${currencyFormatter(
                            contest.config.amount,
                            "NGN"
                          )}`
                        : "Join for free"}
                    </p>
                  </div>

                  {/* @ts-ignore */}
                  {String(contest.createdBy._id) === String(customer._id) ? (
                    <div className="relative">
                      <div
                        className="cursor-pointer"
                        onClick={() => setOpen((prev) => !prev)}
                      >
                        <MoreVertical />
                      </div>

                      {open && (
                        <div className="flyover-menu rounded-md">
                          <ul>
                            <li
                              className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                              onClick={() => {
                                useAppStore.setState({
                                  modal: {
                                    open: true,
                                    type: String(contest._id),
                                  },
                                });
                                setPool(contest);
                              }}
                            >
                              <UserPlus color="#1D2D50" size={20} />
                              <p className="text-[#1D2D50]">Invite Players</p>
                            </li>

                            <li
                              className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                              onClick={() => {
                                useAppStore.setState({
                                  modal: {
                                    open: true,
                                    type: "check-invitation"
                                  },
                                });
                                setPool(contest);
                              }}
                            >
                              <CheckCircle color="#1D2D50" size={20} />
                              <p className="text-[#1D2D50]">
                                Check Invitation Status
                              </p>
                            </li>

                            {/* <li
                              className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                              onClick={() => navigate("/profile")}
                            >
                              <User color="#1D2D50" size={20} />
                              <p className="text-[#1D2D50]">
                                Review Applications
                              </p>
                            </li> */}

                            {/* <li
                              className="flex gap-2 cursor-pointer hover:opacity-70 py-1"
                              onClick={() => navigate("/profile")}
                            >
                              <Users color="#1D2D50" size={20} />
                              <p className="text-[#1D2D50]">Manage Players</p>
                            </li> */}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      size="small"
                      color="danger"
                      className="sm:w-[90px] w-[65px]"
                      loading={mutation.isLoading}
                      onClick={() =>
                        contest.privacy === "private"
                          ? useAppStore.setState({
                              modal: { open: true, type: "join-contest" },
                            })
                          : mutation.mutateAsync({
                              poolId: String(contest._id),
                            })
                      }
                    >
                      Join
                    </Button>
                  )}
                </div>
                <p className="mt-4">
                  {contest.description ||
                    "No description provided for this contest."}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* @ts-ignore */}
      <InvitePlayers pool={pool} />
      {/* @ts-ignore */}
      <CheckInviteStatus pool={pool} />
      <JoinContest />
    </Layout>
  );
};

export default Challenges;
