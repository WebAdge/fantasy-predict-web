import { Dispatch, SetStateAction, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { googleAuth } from "../../server/user";
import { saveCustomerDetails } from "../../utils/shared";
import { processDefaults } from "./sideEffect";

import OnboardingLayout from "../../components/OnboardingLayout";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState<boolean>(false);

  processDefaults(navigate);
  const mutation = useMutation(googleAuth, {
    onSuccess: (data) => {
      saveCustomerDetails(data);
      navigate("/features");
    },
  });

  return (
    <>
      <div className="block sm:hidden">
        <MobileView
          {...{ agreed }}
          {...{ setAgreed }}
          error={error}
          setError={setError}
          mutation={mutation}
          navigate={navigate}
        />
      </div>
      <div className="hidden sm:block">
        <DesktopView
          {...{ agreed }}
          {...{ setAgreed }}
          error={error}
          setError={setError}
          mutation={mutation}
          navigate={navigate}
        />
      </div>
    </>
  );
};

export default Register;

type Props = {
  error: string;
  agreed: boolean;
  setAgreed: Dispatch<SetStateAction<boolean>>;
  navigate: NavigateFunction;
  setError: Dispatch<SetStateAction<string>>;
  mutation: UseMutationResult<
    any,
    unknown,
    { credential: string; type: string },
    unknown
  >;
};

const MobileView = ({
  navigate,
}: Props) => {
  return (
    <OnboardingLayout className="block sm:hidden">
      <div className="p-2 rounded-lg">
        <h2 className="mt-5 text-[24px] font-bold navy-color">Join Fantasy Predict!</h2>
        <div className="mt-8">
          <RegisterForm />
          <p className="mt-3">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        </div>
      </div>
    </OnboardingLayout>
  );
};

const DesktopView = ({
  navigate,
}: 
Props) => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="py-5 px-10 w-full hidden sm:block">
        <p className="mt-5 font-bold text-[24px]">Join Fantasy Predict!</p>
        
        <div className="mt-5">
          <RegisterForm />
          <p className="mt-3">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        </div>
      </div>
    </div>
  );
};
