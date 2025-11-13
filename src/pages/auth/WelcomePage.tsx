import Button from "../../library/Button";
import { useNavigate } from "react-router-dom";
import DashboardImage from "../../assets/dashboard.webp";
import GreenCurve from "../../assets/green-curve.svg";
import Background from "../../assets/bg.svg";
import PlayerKick from "../../assets/player-kick.png";
import { CreditCard, Lock, Search, Users } from "react-feather";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="bg-dark relative w-full"
        style={{ background: `url('${Background}'), #1B0A4B`, width: "100vw", backgroundSize: "cover" }}
      >
        <div className="space-y-8 w-full">
          <div className="py-20 px-10 md:p-20 flex flex-col items-center justify-center w-full text-white gap-8  text-center">
            <div className="font-bold font-dmsans sm:text-[56px] text-[42px] leading-[70px] md:leading-[6vw] tracking-[0.01em] md:text-[4.86vw]  capitalize">
              <div className="inline md:block capitalize">
                Challenge your friends and discover who is the best
              </div>
            </div>
            <div className="tracking-[0.5%] sm:text-[20px] text-[14px] leading-7 md:leading-[2.5vw] font-Poppins md:text-[1.6vw] opacity-70">
              <div>
                Bring your friends in a pool and see who is the best predictor
              </div>
              <div>
                Enjoy the ease of challenging others even if they're miles away.{" "}
              </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-5 sm:w-[400px] w-full">
              <Button color="orange" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                onClick={() => navigate("/create-account")}
                color="outline"
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="w-full relative flex justify-center">
            <div className="relative w-3/4 md:w-2/3 z-[1] md:min-h-[34vw]">
              <img
                decoding="async"
                loading="lazy"
                src={DashboardImage}
                alt="Dashboard"
                className="i1 w-full rounded-[20px]"
              />
            </div>
            <div className="absolute left-0 h-[100px] md:h-[170px] bottom-[-6.5%] w-full bg-[#00EFC1] z-[0]">
              <img
                src={GreenCurve}
                className="bottom-[-4vw] absolute"
                aria-label="icon"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-10 md:px-20 bg-white flex sm:flex-row flex-col gap-5 w-full">
        <div className="sm:w-[30%] w-full flex justify-center items-center">
        <img
          decoding="async"
          loading="lazy"
          src={PlayerKick}
          alt="Dashboard"
          className="flex justify-center items-center w-full rounded-[20px]"
        />
        </div>

        <div className="sm:w-[70%] w-full">
        <FeatureSection />
        </div>
      </div>
    </div>
  );
};

const FeatureSection = () => {
  return (
    <div>
      <div className="flex sm:flex-row flex-col w-full gap-5 sm:gap-10 sm:p-10 ">
        {SECTION1_FEATURES.map((feature) => (
          <div
            key={feature.key}
            className={`flex items-center md:items-start md:justify-center gap-6 md:gap-10`}
          >
            <div className="text-[#09703E]">{feature.icon}</div>
            <div className="max-w-lg text-center md:text-left">
              <div className="font-semibold text-[28px] md:text-[2.5vw] leading-[36px] md:leading-[3.2vw] mb-4">
                {feature.title}
              </div>
              <div className="text-[18px] md:text-[1.2vw] leading-[28px] md:leading-[1.9vw] opacity-70">
                {feature.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex sm:flex-row flex-col w-full gap-5 sm:gap-10 sm:p-10 sm:-mt-10 mt-5">
        {SECTION2_FEATURES.map((feature) => (
          <div
            key={feature.key}
            className={`flex items-center md:items-start md:justify-center gap-6 md:gap-10`}
          >
            <div className="text-[#09703E]">{feature.icon}</div>
            <div className="max-w-lg text-center md:text-left">
              <div className="font-semibold text-[28px] md:text-[2.5vw] leading-[36px] md:leading-[3.2vw] mb-4">
                {feature.title}
              </div>
              <div className="text-[18px] md:text-[1.2vw] leading-[28px] md:leading-[1.9vw] opacity-70">
                {feature.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SECTION1_FEATURES = [
  {
    icon: <Users/>,
    title: "Create/Join Pool",
    content:
      "Create or join prediction pools with friends to compete and showcase your forecasting skills.",
    key: 1,
  },
  {
    icon: <Search />,
    title: "Fun Prediction",
    content:
      "Engage in exciting and enjoyable predictions across various leagues and cups with friends.",
    key: 2,
  },
];

const SECTION2_FEATURES = [
  {
    icon: <CreditCard />,
    title: "Win Rewards",
    content:
      "Stand a chance to win exciting rewards and recognition for your accurate predictions and top performance in pools.",
    key: 3,
  },
  {
    icon: <Lock />,
    title: "Leaderboards",
    content:
      "Track your performance and see how you rank against friends and other participants in real-time leaderboards.",
    key: 4,
  },
];

export default WelcomePage;
