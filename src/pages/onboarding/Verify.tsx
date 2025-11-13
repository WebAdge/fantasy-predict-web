import { getCustomerDetails } from "../../utils/shared";

import OnboardingLayout from "../../components/OnboardingLayout";
import VerifyAccountForm from "../../components/forms/VerifyAccountForm";
import { IUser } from "../../type";

const Verify = () => {
  const customer = getCustomerDetails();

  return (
    <>
      <div className="block sm:hidden">
        <MobileView customer={customer} />
      </div>
      <div className="hidden sm:block">
        <DesktopView customer={customer} />
      </div>
    </>
  );
};

export default Verify;

type Props = {
  customer: Partial<IUser>;
};

const MobileView = (_props: Props) => {
  return (
    <OnboardingLayout className="block sm:hidden">
      <h2 className="mt-5 text-[24px] font-bold text-black">Verify Account</h2>

      <div className="mt-5">
        <p>Enter the verification code was sent to your email!</p>
        <VerifyAccountForm />
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = (_props: Props) => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="py-5 px-10 w-[550px]">
        <h2 className="mt-5 text-[24px] font-bold">Verify Account</h2>

        <div className="mt-3">
        <p>Enter the verification code was sent to your email!</p>
        </div>

        <div className="mt-5">
          <VerifyAccountForm />
        </div>
      </div>
    </div>
  );
};
