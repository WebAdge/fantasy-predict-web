/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Skeleton } from "antd";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IPoolLeaderboard } from "../../type";
import { fetchPoolLeaderboard } from "../../server/pools";
import Button from "../../library/Button";
import { ArrowRightCircle } from "react-feather";
import { getAllUsers } from "../../server/user";

const Leaderboard = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<IPoolLeaderboard[]>(
    ["leaderboard-contest"],
    () => fetchPoolLeaderboard(),
  );

  const { data: userData, isLoading: userLoading } = useQuery(
    ["users-contest"],
    () => getAllUsers(),
  );

  return (
    <Layout>
      <h3 className="text-[22px] leading-[28px] font-bold">Leaderboard</h3>
      {isLoading || userLoading ? (
        <div className="flex flex-col gap-5 mt-5">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="mt-5 mb-20">
          {data?.filter(d => d.name === "Global")?.map((contest) => (
            <div
              className="rounded-2xl p-5 bg-white my-2 border-[1px] border-gray-200"
              key={contest._id}
              onClick={() => {
                if (contest.isCreator || contest.isMember) {
                  navigate(
                    // @ts-ignore
                    `/leaderboard/${contest.name}/${contest.competition._id}/${contest.config.paid ? "true" : "false"}`,
                  );
                }
              }}
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="border-[1px] rounded-full p-2 border-red-100 text-center bg-red-100">
                    <p className="uppercase text-gray-700">
                      {contest.name.split(" ")[0]?.charAt(0) || ""}
                      {contest.name.split(" ")[1]?.charAt(0) || "A"}
                    </p>
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-black">{contest.name}</h2>
                    <div className="text-xs italic flex gap-2">
                      {/* @ts-ignore */}
                      <p className="text-black">Competion: ALL</p>
                      <p className="text-black">Members: {userData?.totalDocs}</p>
                      {contest.config.paid ? (
                        <p className="text-black">Fee: {contest.config.amount}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <ArrowRightCircle size={24} className="text-blue-950" />
              </div>

              <div className="ml-12 mt-3">
                {!contest.isCreator && !contest.isMember && (
                  <Button
                    size="small"
                    color="danger"
                    className="sm:w-[90px] w-[65px]"
                    onClick={() =>
                      navigate(`/pool-detail/${contest.name}/${contest._id}`)
                    }
                  >
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))}
          {data?.filter(d => d.name !== "Global")?.map((contest) => (
            <div
              className="rounded-2xl p-5 bg-white my-2 border-[1px] border-gray-200"
              key={contest._id}
              onClick={() => {
                if (contest.isCreator || contest.isMember) {
                  navigate(
                    // @ts-ignore
                    `/leaderboard/${contest.name}/${contest.competition._id}/${contest.config.paid ? "true" : "false"}`,
                  );
                }
              }}
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <div className="border-[1px] rounded-full p-2 border-red-100 text-center bg-red-100">
                    <p className="uppercase text-gray-700">
                      {contest.name.split(" ")[0]?.charAt(0) || ""}
                      {contest.name.split(" ")[1]?.charAt(0) || "A"}
                    </p>
                  </div>
                  <div>
                    
                    <h2 className="font-bold text-xl text-black">{contest.name}</h2>
                    <div className="text-xs italic flex gap-2 text-black">
                      {/* @ts-ignore */}
                      <p>Competion: {contest.competition?.code}</p>
                      <p>Members: {contest.totalMembers}</p>
                      {contest.config.paid ? (
                        <p>Fee: {contest.config.amount}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <ArrowRightCircle size={24} className="text-blue-950" />
              </div>

              <div className="ml-12 mt-3">
                {!contest.isCreator && !contest.isMember && (
                  <Button
                    size="small"
                    color="danger"
                    className="sm:w-[90px] w-[65px]"
                    onClick={() =>
                      navigate(`/pool-detail/${contest.name}/${contest._id}`)
                    }
                  >
                    Join
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Leaderboard;
