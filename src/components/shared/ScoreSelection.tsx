import { format } from "date-fns";
import Input from "../../library/Input";
import { IMatch } from "../../type";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { predict } from "../../server/matches";

type Props = {
  item: IMatch;
};

const ScoreSelection = ({ item }: Props) => {
  const queryClient = useQueryClient();

  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  useEffect(() => {
    if (item?.prediction?.length) {
        const home = item.prediction[0]?.outcome?.split('-')[0]
        const away = item.prediction[0]?.outcome?.split('-')[1]
        console.log({
            home,
            away
        })
        setHomeScore(home);
        setAwayScore(away);
    }
  }, [item.prediction])

  const mutation = useMutation(predict, {
    onSuccess: () => {
      queryClient.invalidateQueries("match");
    },
  });

  const onHomeScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHomeScore(value);
    if (awayScore && value) {
      // mutate
      mutation.mutate({
        match: item._id,
        competition: item.competition,
        outcome: `${value}-${awayScore}`,
      });
    }
  };

  const onAwayScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAwayScore(value);
    if (homeScore && value) {
      // mutate
      mutation.mutate({
        match: item._id,
        competition: item.competition,
        outcome: `${homeScore}-${value}`,
      });
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5 items-center">
      <div className="flex gap-5">
        <Input
          onChange={(e) => onHomeScoreChange(e)}
          className="w-[50px] text-center font-bold"
          value={homeScore}
        />
        -
        <Input
          onChange={(e) => onAwayScoreChange(e)}
          className="w-[50px] text-center font-bold"
          value={awayScore}
        />
      </div>
      {item.prediction?.length ? (
        <p className="sm:text-xs text-[0.55rem]">
          Predicted on{" "}
          {format(
            new Date(item.prediction[0].updatedAt as string),
            "dd MMM yyyy"
          )}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ScoreSelection;
