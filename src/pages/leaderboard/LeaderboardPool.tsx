import { Table } from "antd";
import { useParams } from "react-router-dom";
import { leaderboardColumn } from "../../components/columns/leaderboard";
import Layout from "../../components/Layout";
import { useQuery } from "react-query";
import { fetchCompetitionLeaderboard } from "../../server/pools";
import Loading from "../../components/Loading";

const LeaderboardPool = () => {
  const { id, name } = useParams();

  const { data, isLoading } = useQuery(['comp-leaderboard', id], () => fetchCompetitionLeaderboard(id as string))

  return (
    <Layout>
      {isLoading ? <Loading /> :
        <div>
          <h3 className="text-[22px] leading-[28px] font-bold mb-3 capitalize">{name}</h3>
          <h5 className="text-center font-bold text-lg">Your Rank</h5>
          <div className="bg-gray-600 p-3 w-full mt-2">
            <div className="flex justify-between items-center">
              <p>{data?.personalRank ? data?.personalRank[0]?.rank || 'No rank' : 'Yet to predict'}</p>
              <div className="flex gap-3 justify-center items-center">
                <div className="p-1 border-black rounded-full border-[1px] text-[9px]">
                  {data?.personalRank ? data.personalRank[0]?.user?.firstName?.split(" ")[0]?.charAt(0) || "Y" : ""}
                  {data?.personalRank ? data.personalRank[0]?.user?.lastName?.split(" ")[1]?.charAt(0) || "O" : ""}
                </div>
                <p>You</p>
              </div>
              <p className="font-bold">{data?.personalRank ? data.personalRank[0]?.Total || '0' : ''}</p>
            </div>
          </div>

          <div className="mt-5">
            <Table columns={leaderboardColumn()} dataSource={data?.board || []} pagination={false} />
          </div>
        </div>}
    </Layout>
  );
};

export default LeaderboardPool;
