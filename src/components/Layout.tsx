import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Globe, Home, User, Users } from "react-feather";
import Logo from '../assets/logo-icon.png';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
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
    // <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700">
      <div className="flex justify-around items-center py-3">
        <div
          onClick={() => navigate("/home")}
          className="flex flex-col items-center text-white active:scale-95"
        >
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div
          onClick={() => navigate("/home/scores")}
          className="flex flex-col items-center text-white active:scale-95"
        >
          <Globe size={22} />
          <span className="text-xs mt-1">Scores</span>
        </div>

        <div
          onClick={() => navigate("/home/pools")}
          className="flex flex-col items-center text-white active:scale-95"
        >
          <Users size={22} />
          <span className="text-xs mt-1">My Pools</span>
        </div>

        <div
          onClick={() => navigate("/leaderboard")}
          className="flex flex-col items-center text-white active:scale-95"
        >
          <Activity size={22} />
          <span className="text-xs mt-1">Leaderboard</span>
        </div>

        {/* <div
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-white active:scale-95"
        >
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </div> */}
      </div>
    </div>
  );
};

// type NProp = {
//   isLoading: boolean;
//   data: any
// }

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 w-full">
      {/* <div className="flex justify-between w-full bg-blue-950 p-5"> */}
      <div className="flex justify-between w-full bg-black p-5">
        {/* Home */}
        <div
          className="cursor-pointer flex gap-1 ml-5"
          onClick={() => navigate("/home")}
        >
          <img src={Logo} className="h-[50px] w-[50px] rounded-full" />
          {/* <p className="font-black italic rounded-full bg-white flex gap-[3px] p-3 items-start">
            FP
          </p> */}
          <p className="text-white items-start text-lg font-bold p-3">
            Fantasy Predict
          </p>
        </div>

        {/* Center Nav (Desktop only) */}

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

      <div
        className="px-4 py-2 rounded-full bg-blue-800 text-white hover:bg-blue-700"
        onClick={() => navigate("/wallet")}
      >
        Deposit
      </div> */}
          <div className="hidden text-white sm:flex gap-10 justify-center items-center">
            <p
              onClick={() => navigate("/home")}
              className="flex flex-col items-center text-white active:scale-95 mr-5 cursor-pointer"
            >
              <Home size={22} />
              <span className="text-xs mt-1">Home</span>
            </p>
            <p
              onClick={() => navigate("/home/scores")}
              className="flex flex-col items-center text-white active:scale-95 mr-5 cursor-pointer"
            >
              <Globe size={22} />
              <span className="text-xs mt-1">Scores</span>
            </p>
            <p
              onClick={() => navigate("/home/pools")}
              className="flex flex-col items-center text-white active:scale-95 mr-5 cursor-pointer"
            >
              <Users size={22} />
              <span className="text-xs mt-1">My Pools</span>
            </p>
            <p
              onClick={() => navigate("/leaderboard")}
              className="flex flex-col items-center text-white active:scale-95 mr-5 cursor-pointer"
            >
              <Activity size={22} />
              <span className="text-xs mt-1">Leaderboard</span>
            </p>
          </div>
          <div
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center text-white active:scale-95 mr-5 cursor-pointer"
          >
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
