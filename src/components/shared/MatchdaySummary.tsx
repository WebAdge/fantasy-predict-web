import { useState } from "react";
import Button from "../../library/Button";
import CheckBox from "../../library/Checkbox";
import { IMatch } from "../../type";
import { getCustomerDetails } from "../../utils/shared";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { sendPredictionMail } from "../../server/matches";

type Props = {
  matches: IMatch[];
  hasPicks: boolean;
};

const MatchdaySummary = ({ matches, hasPicks }: Props) => {
  const customer = getCustomerDetails();
  const [sendEmail, setSendEmail] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation(sendPredictionMail, {
    onMutate: () => {
       navigate("/home");
    }
  })

  const onFinish = () => {
    if (sendEmail) {
      mutation.mutate({ matchday: matches[0]?.matchday, competition: matches[0]?.competition });
    } else {
      navigate("/home");
    }
  }

  return (
    <div>
      {hasPicks ? (
        <div className="rounded-xl p-5 bg-slate-200 mt-8">
          <h3 className="text-2xl font-bold mb-5">Your Pick Summary</h3>
          {matches.map((match, index) => (
            <div key={index} className="flex gap-5 mt-5">
              <div className="w-[50%] items-center">
                <p className="text-sm font-semibold">
                  {match.homeTeam.name} vs {match.awayTeam.name}
                </p>
              </div>
              <div className="w-[50%]">
                {match.prediction?.length ? (
                  <p className="text-black font-extrabold">
                    {match.homeTeam.shortName.slice(0, 3).toUpperCase()}{" "}
                    {match.prediction?.[0]?.outcome?.split("-")[0]} -{" "}
                    {match.prediction?.[0]?.outcome?.split("-")[1]}{" "}
                    {match.awayTeam.shortName.slice(0, 3).toUpperCase()}
                  </p>
                ) : (
                  <p className="text-red-800 font-bold">No pick</p>
                )}
              </div>
            </div>
          ))}

          <div className="border-t-2 border-black mt-4">
            <div className="flex gap-2">
              <CheckBox onSelect={(val) => setSendEmail(val)} />
              {customer?.email && (
                <p className="mt-5 text-sm text-slate-600">
                  Send an email confirmation of my picks to {customer?.email}
                </p>
              )}
            </div>

            <Button color="danger" className="mt-5" onClick={onFinish}>
              Continue
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MatchdaySummary;
