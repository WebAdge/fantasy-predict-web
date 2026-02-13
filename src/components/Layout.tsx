import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Globe, Home, User, Users } from "react-feather";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  // const { data, isLoading } = useQuery("wallet", getWallet);

  return (
    <div className="pb-2">
      <div className="w-full mx-auto">
        <Navbar 
        // isLoading={isLoading} data={data} 
        />
        <div className="sm:mt-10 mt-4 mx-5">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
          <div className="flex justify-around items-center py-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex flex-col items-center text-white active:scale-95"
            >
              <Home size={22} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => navigate("/dashboard/scores")}
              className="flex flex-col items-center text-white active:scale-95"
            >
              <Globe size={22} />
              <span className="text-xs mt-1">Scores</span>
            </button>

            <button
              onClick={() => navigate("/dashboard/pools")}
              className="flex flex-col items-center text-white active:scale-95"
            >
              <Users size={22} />
              <span className="text-xs mt-1">My Pools</span>
            </button>

            <button
              onClick={() => navigate("/leaderboard")}
              className="flex flex-col items-center text-white active:scale-95"
            >
              <Activity size={22} />
              <span className="text-xs mt-1">Leaderboard</span>
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center text-white active:scale-95"
            >
              <User size={22} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
  )
}

// type NProp = {
//   isLoading: boolean;
//   data: any
// }

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 w-full">
  <div className="flex justify-between w-full bg-blue-950 p-2 rounded-lg">
    {/* Home */}
    <div
      className="cursor-pointer rounded-full bg-white flex gap-[3px] p-3 items-start"
      onClick={() => navigate("/dashboard")}
    >
      <p className="font-black italic">FP</p>
    </div>

    {/* Center Nav (Desktop only) */}
    <div className="hidden sm:flex gap-5 justify-center items-center">
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
        My Pools
      </p>
      <p
        onClick={() => navigate("/dashboard/leaderboard")}
        className="cursor-pointer hover:underline hover:font-bold"
      >
        Leaderboard
      </p>
    </div>

    {/* Right actions */}
    <div className="flex gap-3 items-center">
      {/* <div className="flex gap-5 items-center text-white">

        <p className="font-bold">
          ₦
          {isLoading
            ? "---"
            : Number(data?.balance || 0).toLocaleString()}
        </p>
      </div>

      <button
        className="px-4 py-2 rounded-full bg-blue-800 text-white hover:bg-blue-700"
        onClick={() => navigate("/wallet")}
      >
        Deposit
      </button> */}
      <button
              onClick={() => navigate("/profile")}
              className="flex flex-col items-center text-white active:scale-95 mr-5"
            >
              <User size={22} />
              {/* <span className="text-xs mt-1">Profile</span> */}
            </button>
    </div>
  </div>
</div>

  )
}