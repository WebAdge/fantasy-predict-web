import { Helmet } from "react-helmet";
import { shallow } from "zustand/shallow";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import {
  calculatePercentage,
  composeQuestionData,
  getCustomerDetails,
  saveCustomerDetails,
} from "../../utils/shared";
import useAppStore from "../../utils/appStore";
import { addOnboardingData, getOnboardingData } from "../../server/user";

import Button from "../../library/Button";
import Progress from "../../library/Progress";
import Loading from "../../components/Loading";
import ServerError from "../../components/ServerError";
import OnboardingLayout from "../../components/OnboardingLayout";

const ProfileCreation = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [customData, setCustomData] = useState<any>();
  const [boardingState, setBoarding] = useState(0);
  const [completed, setCompleted] = useState(false);

  const customer = getCustomerDetails();
  const onboarding = useAppStore((state) => state.onboarding, shallow);

  const { data, isLoading } = useQuery("onboarding-data", getOnboardingData);

  const mutation = useMutation(addOnboardingData, {
    onSuccess: (data) => {
      saveCustomerDetails(data);
      navigate("/chat");
    },
  });

  const handleAnswer = () => {
    const currentQuestion = customData[boardingState];
    const filledCurrentQuestion = onboarding
      ? onboarding[currentQuestion.identifier]
      : null;
    if (currentQuestion.required && !filledCurrentQuestion) {
      setError(`${currentQuestion.question} is required`);
      return;
    }

    const lastItem = customData.length - 1;
    if (boardingState !== lastItem) {
      const nextState = boardingState + 1;
      setBoarding(nextState);
      const curentPercent = calculatePercentage(nextState, customData.length);
      setProgress(Number(curentPercent));
      setError("");
      return;
    }

    let allData = composeQuestionData(onboarding);
    if (customer?.meta) {
      allData = { ...customer?.meta, ...allData };
    }
    const payload = {
      ...allData,
      onboardingComplete: true,
    };

    mutation.mutateAsync({
      ...payload,
      id: customer.id,
    });

    return;
  };

  const handlePrevious = () => {
    if (boardingState > 0) {
      const nextState = boardingState - 1;
      setBoarding(nextState);
      const curentPercent = calculatePercentage(nextState, customData.length);
      setProgress(Number(curentPercent));
      setError("");
      return;
    }
  };

  useEffect(() => {
    if (customer?.meta?.onboardingComplete) {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (!customer.meta) {
      setCustomData(data);
    }

    if (customer?.meta && !customer?.meta?.onboardingComplete) {
      const newFlow = data?.filter((item: { isNew: boolean }) => item.isNew);
      setCustomData(newFlow);
    }
  }, [data]);

  return (
    <div className=" h-screen">
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      {customer.id && (
        <OnboardingLayout hide message={completed ? "" : "You're almost in…"}>
          <div className="sm:w-full">
            {completed ? (
              <div className="flex justify-center items-center h-screen w-full">
                <div>
                  <img
                    alt="profile completed"
                    src={`${import.meta.env.VITE_S3_URL}/profile-complete.svg`}
                  />
                  <p className="text-[20px] font-[300] text-center">
                    Profile creation complete
                  </p>
                  <Button
                    onClick={() => navigate("/home")}
                    className="mt-5"
                  >
                    Proceed to home
                  </Button>
                </div>
              </div>
            ) : (
              <div className="sm:grid sm:place-items-center sm:w-full mt-3">
                <div className="sm:w-[444px] max-w-[350px]">
                  <div className="flex gap-1">
                    <Progress
                      percent={progress}
                      strokeColor="#DA8E6B"
                      trailColor="#1D2D50"
                    />
                    <p className="text-[#DA8E6B]">{`${progress}%`}</p>
                  </div>

                  {isLoading ? <Loading /> : <></>}

                  {customData?.length && (
                    <div className="mt-5 pb-[30px]">
                      <p className="font-[700] text-[24px] navy-color leading-[24px]">
                        {customData[boardingState].question}
                      </p>
                      <p className="text-sm italic mt-[3px]">
                        {customData[boardingState].subQuestion}
                      </p>
                      <div className="mt-5">
                        {!customData[boardingState].required ? (
                          <div className="mt-3 text-xs">
                            You can add or update answers in your settings at
                            any time
                          </div>
                        ) : null}
                      </div>

                      {mutation.error instanceof Error && (
                        <div className="mt-2">
                          <ServerError message={mutation.error.message} />
                        </div>
                      )}

                      {error && (
                        <div className="mt-2">
                          <ServerError message={error} />
                        </div>
                      )}

                      <div className="flex gap-5">
                        <Button
                          className="mt-10"
                          onClick={handlePrevious}
                          disabled={mutation.isLoading}
                        >
                          Previous
                        </Button>

                        <Button
                          className="mt-10"
                          onClick={handleAnswer}
                          loading={mutation.isLoading}
                          color="orange"
                        >
                          {customData.length - 1 === boardingState
                            ? "Finish"
                            : "Continue"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </OnboardingLayout>
      )}
    </div>
  );
};

export default ProfileCreation;
