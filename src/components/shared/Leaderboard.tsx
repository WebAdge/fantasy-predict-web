import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/leaderboard")}
      className="h-[80px] w-full cursor-pointer rounded-md border-[0.2px] border-[#403f3f] p-3 mb-5"
    >
      <p className="font-bold text-lg">Leaderboard</p>
      <span>See where you rank on the leaderboard</span>
    </div>
  );
};

export default Leaderboard;
