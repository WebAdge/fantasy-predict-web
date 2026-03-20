import { format } from "date-fns";
import { IMatch } from "../../type";
import { useEffect, useState } from "react";

type Props = {
  item: IMatch;
};

const ScoreResultDisplay = ({ item }: Props) => {
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  useEffect(() => {
    if (item?.homeTeam?.score && item?.awayTeam?.score) {        
        setHomeScore(String(item?.homeTeam?.score || ''));
        setAwayScore(String(item?.awayTeam?.score || ''));
    }
  }, [item])

  return (
    <div className="flex flex-col justify-center gap-5 items-center">
      <div className="flex gap-5">
        <div className="p-2 bg-[#f7f7f7]">
            <p className={`${Number(homeScore) > Number(awayScore) ? 'font-bold' : ''}`}>{homeScore}</p>
        </div>
        -
        <div className="p-2 bg-[#f7f7f7]">
            <p className={`${Number(awayScore) > Number(homeScore) ? 'font-bold' : ''}`}>{awayScore}</p>
        </div>
      </div>
      {!item.prediction.length ?
      <p className="sm:text-xs text-[0.55rem] py-1 px-3 rounded-lg bg-[#d7d5d5] text-black">Not Selected</p>
    :
    item.prediction[0].point === 3 ? <p className="sm:text-xs text-[0.55rem] py-1 px-3 rounded-lg bg-green-800 text-white">Correct</p> :
    item.prediction[0].point === 2 ? <p className="sm:text-xs text-[0.55rem] py-1 px-3 rounded-lg bg-green-800 text-white">Correct</p> :
    item.prediction[0].point === 1 ? <p className="sm:text-xs text-[0.55rem] py-1 px-3 rounded-lg bg-green-800 text-white">Correct</p> :
    item.prediction[0].status === "pending" ? <></> : <p className="sm:text-xs text-[0.55rem] py-1 px-3 rounded-lg bg-red-800 text-white">Wrong</p>
    }
      {item.status === "finished" ? (
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

export default ScoreResultDisplay;
