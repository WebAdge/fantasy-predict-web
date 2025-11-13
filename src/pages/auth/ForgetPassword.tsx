import OnboardingLayout from "../../components/OnboardingLayout";
import ForgetPasswordForm from "../../components/forms/ForgetPasswordForm";

const ForgetPassword = () => {
  return (
    <>
      <div className="block sm:hidden">
        <MobileView />
      </div>

      <div className="hidden sm:block">
        <DesktopView />
      </div>
    </>
  );
};

export default ForgetPassword;

const MobileView = () => {
  return (
    <OnboardingLayout>
      <h2 className="my-5 text-[24px] font-bold text-black">Forget Password</h2>
      <p>Looks like you kinda forget your password, right! No problem.</p>
      <p>Enter your email below and we'll get you back on track</p>

      <div>
        <ForgetPasswordForm />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="py-5 px-10 max-w-[645px]">
        <h2 className="my-5 text-[18px] font-bold">Forget Password</h2>
        <p>Looks like you kinda forget your password, right! No problem.</p>
        <p>Enter your email below and we'll get you back on track</p>

        <div className="mt-5">
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
};
