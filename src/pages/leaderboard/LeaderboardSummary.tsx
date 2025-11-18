/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from "react-query";
import Layout from "../../components/Layout";
import { Globe } from "react-feather";
import { fetchPools } from "../../server/pools";
import { getUserCount } from "../../server/user";
import Loading from "../../components/Loading";
import { IPool } from "../../type";
import { useNavigate } from "react-router-dom";

const LeaderboardSummary = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("pools", () => fetchPools(""));
  const { data: countData, isLoading: countLoading } = useQuery<{
    totalUsers: number;
  }>("user-count", getUserCount);

  return (
    <Layout>
      <div className="flex justify-between">
        <h3 className="text-[22px] leading-[28px] font-bold mb-10">
          Leaderboard
        </h3>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-5">
          <div
            onClick={() => navigate("/leaderboard-details")}
            className="rounded-xl p-5 border-[1px] border-black cursor-pointer"
          >
            <div className="flex gap-5">
              <Globe size={30} />
              <div>
                <p className="font-bold">Global</p>
                <p>
                  {countLoading ? (
                    "---"
                  ) : (
                    <>{countData?.totalUsers} predictors</>
                  )}
                </p>
              </div>
            </div>
          </div>

          {data?.map((doc: IPool) => (
            <div
              key={doc?._id}
              className="rounded-xl p-5 border-[1px] border-black cursor-pointer"
              onClick={() =>
                // @ts-ignore
                navigate(`/leaderboard/${doc.competition._id}/${doc._id}`)
              }
            >
              <div className="flex gap-5">
                <img src={`../../leaderboard/${doc.icon || 'flag'}.png`} className="h-[30px] w-[30px]" />
                <div>
                  <p className="font-bold">{doc.name}</p>
                  <p>{doc.totalMembers} predictors</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default LeaderboardSummary;
