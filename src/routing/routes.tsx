import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/onboarding/Login";
import Features from "../pages/auth/features";
import Verify from "../pages/onboarding/Verify";
import Register from "../pages/onboarding/Register";
import Password from "../pages/onboarding/Password";
import PrivacyPolicy from "../pages/auth/PrivacyPolicy";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import TermCondition from "../pages/auth/TermCondition";
import Authenticated from "./Authenticated";
import ProfileCreation from "../pages/onboarding/ProfileCreation";
import Home from "../pages/dashboard/Home";
import Profile from "../pages/personal/Profile";
import AddAvatar from "../pages/onboarding/AddAvatar";
import Wallet from "../pages/wallet";
import Challenges from "../pages/contests";
import CreateContest from "../pages/contests/CreateContest";
import WelcomePage from "../pages/auth/WelcomePage";
import Leaderboard from "../pages/leaderboard";
import Scores from "../pages/dashboard/Scores";
import ContestDetail from "../pages/contests/ContestDetail";
import LeaderboardPool from "../pages/leaderboard/LeaderboardPool";
import ManagePool from "../pages/contests/ManagePool";
import MatchDayPrediction from "../pages/dashboard/MatchDayPrediction";


const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/verify-account" element={<Verify />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/create-password" element={<Password />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/terms-and-condition" element={<TermCondition />} />

        {/* Protected routes */}
        {/* routes outside the sidebar or dashboard here */}
        <Route element={<Authenticated />}>
          <Route path="/onboarding" element={<ProfileCreation />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:matchday/:competition" element={<MatchDayPrediction />} />
          <Route path="/home/scores" element={<Scores />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-avatar" element={<AddAvatar />} />
          <Route path="/home/pools" element={<Challenges />} />
          <Route path="/create-pool" element={<CreateContest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/pool-detail/:name/:id" element={<ContestDetail />} />
          <Route path="/pool-view/:name/:id" element={<ManagePool />} />
          <Route path="/leaderboard/:name/:id/:free" element={<LeaderboardPool />} />
        </Route>
        {/* routes outside the sidebar or dashboard ends here */}

        {/* 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
