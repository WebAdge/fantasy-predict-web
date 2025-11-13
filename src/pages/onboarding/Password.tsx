import OnboardingLayout from "../../components/OnboardingLayout";
import CreatePassword from "../../components/forms/CreatePassword";

const Password = () => {
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

export default Password;

const MobileView = () => {
  return (
    <OnboardingLayout className="block sm:hidden">
      <h2 className="mt-5 text-[24px] font-bold text-black">
        Create a password
      </h2>

      <p className="text-black text-xs mt-2">
        Use at least 8 characters with 1 number and one special character
      </p>
      <div className="mt-10">
        <CreatePassword />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="py-5 px-10 w-full">
        <h2 className="mt-5 text-[24px] font-bold">Create a password</h2>
        <p className="text-black text-xs mb-2">
          Use at least 8 characters with 1 number and one special character
        </p>

        <div className="mt-5">
          <CreatePassword />
        </div>
      </div>
    </div>
  );
};
