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
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/scores" element={<Scores />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-avatar" element={<AddAvatar />} />
          <Route path="/dashboard/pools" element={<Challenges />} />
          <Route path="/create-pool" element={<CreateContest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/leaderboard/:competition/:contest" element={<Leaderboard />} />
        </Route>
        {/* routes outside the sidebar or dashboard ends here */}

        {/* 404 page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
