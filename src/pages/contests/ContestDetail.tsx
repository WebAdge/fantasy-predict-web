/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getSinglePool, joinPool } from "../../server/pools";
import { IPool } from "../../type";
import Loading from "../../components/Loading";
import { Empty } from "antd";
import Button from "../../library/Button";
import { useState } from "react";

const ContestDetail = () => {
  const queryClient = useQueryClient();
  const { name, id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { data, isLoading } = useQuery<IPool>(["single-pool", id], () =>
    getSinglePool(id || ""),
  );

  const mutation = useMutation(joinPool, {
    onSuccess: () => {
      queryClient.invalidateQueries("contest");
      queryClient.invalidateQueries("leaderboard-contest");
      navigate("/leaderboard");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const onJoin = () => {
    mutation.mutate({ poolId: data?._id || "" });
  };

  return (
    <Layout>
      <h3 className="text-[22px] leading-[28px] font-bold mb-10">
        Join {name}
      </h3>
      {error && (
        <p className="border-[1px] bg-red-200 text-black p-1">{error}</p>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {!data ? (
            <Empty />
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="flex gap-4">
                <div className="border-[1px] rounded-full p-2 border-red-100 text-center bg-red-100">
                  <p className="uppercase text-gray-700">
                    {data.name.split(" ")[0]?.charAt(0) || ""}
                    {data.name.split(" ")[1]?.charAt(0) || "A"}
                  </p>
                </div>
                <div>
                  <h2 className="font-bold text-xl">{data.name}</h2>
                  <div className="text-xs italic flex gap-2">
                    <p>
                      Captain:{" "}
                      {data.createdBy.username ||
                        `${data.createdBy?.lastName} ${data.createdBy.firstName}`}
                    </p>
                    {data.config.paid ? <p>Fee: {data.config.amount}</p> : null}
                  </div>
                </div>
              </div>

              <Button onClick={onJoin} className="mt-10">
                Join {name}
              </Button>

              <p className="mt-5 text-gray-400">Tournament</p>
              {/* @ts-ignore */}
              <p>{data.competition.name}</p>

              <p className="mt-5 text-gray-400">Gameplay</p>
              <p>Classic Leaderboard</p>
              <p className="text-center">
                Predict results, score points for accuracy and climb the
                leaderboard
              </p>

              <p className="mt-5 text-gray-400">Participants</p>
              <p>{data.totalMembers} players</p>

              <p className="mt-5 text-gray-400">Type</p>
              <p className="text-center">
                {data.privacy === "public"
                  ? "Public pool - anyone is welcome"
                  : "Private pool - only invited members are welcome!"}
              </p>

              <p className="mt-5 text-gray-400">What you can win</p>
              <p className="text-center">
                {data.config.paid
                  ? "Real cash if you finish top 3 on the leaderboard"
                  : "Just for fun"}
              </p>

              <p className="mt-5 text-gray-400 text-left">Rules</p>
              <ul className="list-disc p-3">
                <li className="list-item">Pick scores before kick-off</li>
                <li className="list-item">
                  Correct score prediction gets you 3 points
                </li>
                <li className="list-item">
                  Correct outcome prediction gets you 2 points
                </li>
                <li className="list-item">
                  Prediction that's 1 score off the game outcome gets you 1
                  point
                </li>
                <li className="list-item">Wrong prediction gets you 0 point</li>
                {data.config.paid ? (
                  <>
                    <li className="list-item">
                      Win 50% of the total money in the pool if you finish first
                    </li>
                    <li className="list-item">
                      Win 30% of the total money in the pool if you finish
                      second
                    </li>
                    <li className="list-item">
                      Win 10% of the total money in the pool if you finish third
                    </li>
                  </>
                ) : (
                  <>
                    <li className="list-item">Play for fun</li>
                    <li className="list-item">Invite Others</li>
                  </>
                )}
              </ul>

              <Button onClick={onJoin} className="mb-20 mt-3">
                Join {name}
              </Button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ContestDetail;
