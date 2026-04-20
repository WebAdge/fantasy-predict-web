import { useQueryParams } from "../onboarding/Login";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

const ResetPassword = () => {
  const query = useQueryParams();
  return (
    <>
      <div className="block sm:hidden">
        <MobileView query={query} />
      </div>

      <div className="hidden sm:block">
        <DesktopView query={query} />
      </div>
    </>
  );
};

export default ResetPassword;

type Props = {
  query: Record<string, string>[];
};

const MobileView = ({ query }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className="mx-3">
        <h2 className="my-5 text-[24px] font-bold navy-color">
          Reset Password
        </h2>

        <div>
          {query[0]?.code && (
            <p className="navy-color text-center my-2">
              Enter the OTP sent to your email address
            </p>
          )}
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

const DesktopView = ({ query }: Props) => {
  return (
    <div className="">
      <div className="grid place-content-center h-screen">
        <div className="py-5 px-10 w-full">
          <h2 className="my-5 text-[18px] font-bold navy-color">
            Reset Password
          </h2>

          <div className="mt-5">
            {query[0]?.code && (
              <p className="navy-color text-center my-2">
                Enter the OTP sent to your email address
              </p>
            )}
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};
