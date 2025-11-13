import PinField from "react-pin-field";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCustomerDetails } from "../../utils/shared";
import { regenerateOtp, verifyAccount } from "../../server/user";

import Input from "../../library/Input";
import ServerError from "../ServerError";
import Button from "../../library/Button";

const VerifyAccountForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(0);
  const [error, setError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  const customer = getCustomerDetails();

  const mutation = useMutation(verifyAccount, {
    onSuccess: () => {
      navigate("/dashboard");
      setError("");
    },
    onMutate: () => {
      setOtpSuccess("");
      setError("");
    },
    onError: () => {
      setError("Error verifying your account. Please try again");
    },
  });

  const mutationGenerateOtp = useMutation(regenerateOtp, {
    onSuccess: () => {
      setOtpSuccess("OTP sent to your phone");
      setTime(0);
      setError("");
    },
    onMutate: () => {
      setOtpSuccess("");
      setError("");
    },
    onError: () => {
      setError("Error resending verification code");
    },
  });

  const onFinish = () => {
    const data = {
      email: customer.email,
      otp,
    };

    mutation.mutateAsync(data);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="mt-5">
      {error && (
        <div className="mb-3">
          <ServerError message={error} />
        </div>
      )}
      {otpSuccess && (
        <p className="navy-color text-md font-bold text-center">
          OTP Sent to your email
        </p>
      )}
      <div className="hidden md:flex justify-center items-center">
        <PinField
          onComplete={(e) => setOtp(e)}
          length={6}
          inputMode="numeric"
          className="h-[40px] bg-transparent w-[40px] border-[#1D2D50] border-2 text-black rounded-xl text-center ml-2"
        />
      </div>
      <div className="block md:hidden">
        <Input
          onChange={(e) => setOtp(e.target.value)}
          inputMode="numeric"
          className="h-[40px]"
          maxLength={6}
        />
      </div>

      <div className="mt-5">
        <Button
          className="mt-5"
          color="orange"
          onClick={onFinish}
          loading={mutation.isLoading}
        >
          Verify
        </Button>
      </div>

      <div className="mt-5">
        {time >= 10 ? (
          <p
            className={`navy-color font-bold hover:cursor-pointer ${
              mutationGenerateOtp.isLoading ? "animate-pulse" : "animate-none"
            }`}
            onClick={() =>
              !mutationGenerateOtp.isLoading &&
              mutationGenerateOtp.mutateAsync({ email: customer?.email, type: 'verify' })
            }
          >
            Didn't receive the code? Resend
          </p>
        ) : (
          <p>Resend Code in {`00:0${time}`}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountForm;
