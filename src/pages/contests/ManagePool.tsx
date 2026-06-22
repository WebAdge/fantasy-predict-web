/* eslint-disable @typescript-eslint/ban-ts-comment */
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { IPool } from "../../type";
import { getSinglePool } from "../../server/pools";
import Loading from "../../components/Loading";
import { Activity, ArrowRight, FilePlus, UserPlus } from "react-feather";

const menus = (contest: IPool, name: string) => [
  {
    icon: <UserPlus size={24} />,
    name: 'Invite Players',
    link: `/pool-invite/${name}/${contest._id}`,
  },
  {
    icon: <FilePlus size={24} />,
    name: "Manage Players",
    link: `/pool-manage-players/${name}/${contest._id}`,
  },
  {
    icon: <Activity size={24} />,
    name: "Leaderboard",
    // @ts-ignore
    link: `/leaderboard/${contest.name}/${contest.competition._id}/${contest.config.paid ? "true" : "false"}`,
  },
];

const ManagePool = () => {
  const navigate = useNavigate();
  const { id, name } = useParams();

  const { data, isLoading } = useQuery<IPool>(["single-pool", id], () =>
    getSinglePool(id || ""),
  );
  
  return (
    <Layout>
      <h3 className="text-[22px] leading-[28px] font-bold mb-3 capitalize">
        {name}
      </h3>
      <p>{data?.description}</p>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <div className="mt-10 flex flex-col gap-7">
            {menus(data, name || "").map((menu) => (
              <div key={menu.name} className="flex justify-between border-[1px] p-5 rounded-lg" onClick={() => navigate(menu.link)}>
                <div className="flex gap-3">
                  {menu.icon}
                  <p>{menu.name}</p>
                </div>
                <ArrowRight size={20} className="text-blue-900" />
              </div>
            ))}
          </div>
        )
      )}
    </Layout>
  );
};

export default ManagePool;
