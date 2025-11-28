import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Home, User, Users } from "react-feather";
import { useQuery } from "react-query";
import { getWallet } from "../server/wallet";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("wallet", getWallet);

  return (
    <div className="pb-2">
      <div className="w-full mx-auto">
        <div className="flex justify-between w-full bg-blue-950 p-2 rounded-lg text-white">
          <div
            className="cursor-pointer rounded-full bg-white flex gap-[3px] p-3 items-start"
            // onClick={() => setOpen((prev) => !prev)}
            onClick={() => navigate("/dashboard")}
          >
            <Home color="#000" className="opacity-80" size={30} />
          </div>
          {/* Top navbar */}
          <div className="sm:flex hidden gap-5 mt-5 justify-center items-center">
            <p
              onClick={() => navigate("/dashboard/scores")}
              className="cursor-pointer hover:underline hover:font-bold"
            >
              Scores
            </p>
            <p
              onClick={() => navigate("/dashboard/pools")}
              className="cursor-pointer hover:underline hover:font-bold"
            >
              Pools
            </p>
            {/* <p className="cursor-pointer hover:underline hover:font-bold">Pools</p> */}
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex gap-5">
              <div
                className="cursor-pointer "
                onClick={() => navigate("/profile")}
              >
                <User color="#fff" className="mt-3" size={25} />
              </div>

              <p className="mt-3 font-bold">
                ₦
                {isLoading
                  ? "---"
                  : Number(data?.balance || 0).toLocaleString()}
              </p>
            </div>
            <div
              className="p-3 rounded-full text-center bg-blue-800 text-white"
              onClick={() => navigate("/wallet")}
            >
              Deposit
            </div>
          </div>
        </div>
        <div className="sm:hidden flex gap-5 mt-5 justify-center items-center">
          <div
            className="flex gap-2 bg-gray-800 p-3 text-center rounded-full text-white items-center"
            onClick={() => navigate("/dashboard/scores")}
          >
            <Activity color="#fff" size={18} className="" />
            <p className="cursor-pointer hover:underline hover:font-bold">
              Scores
            </p>
          </div>
          <div
            className="flex gap-2 bg-gray-800 p-3 text-center rounded-full text-white items-center"
            onClick={() => navigate("/dashboard/pools")}
          >
            <Users color="#fff" size={18} className="" />
            <p className="cursor-pointer hover:underline hover:font-bold">
              Pools
            </p>
          </div>
        </div>
        <div className="sm:mt-10 mt-4 mx-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
